import express from 'express';

import { Document } from 'mongodb';

const isString = (x: any): x is string => typeof x === 'string';

const getTitleQuery = (req: express.Request): Document => {
    const { title } = req.query;

    if (!isString(title)) {
        return { $match: {} };
    }

    return {
        $match: {
            $text: {
                $search: `"${title}"`,
            },
        },
    };
};

const getFlaggedQuery = (req: express.Request): Document => {
    const { flagged } = req.query;

    if (isString(flagged) && flagged.toLowerCase() === 'true') {
        return { $match: { flagged: true } };
    }

    return { $match: { flagged: false } };
};

const getDateQuery = (req: express.Request): Document => {
    const { afterDate, beforeDate } = req.query;

    const pipeline: Document[] = [];

    if (isString(afterDate)) {
        pipeline.push({ publishedAt: { $gte: afterDate } });
    }

    if (isString(beforeDate)) {
        pipeline.push({ publishedAt: { $lte: beforeDate } });
    }

    if (!pipeline.length) {
        return { $match: {} };
    }

    return {
        $match: {
            $and: pipeline,
        },
    };
};

const getSortQuery = (req: express.Request): Document => {
    const { sortedBy } = req.query;

    if (isString(sortedBy)) {
        return { $sort: { [sortedBy]: -1 } };
    }

    return {
        $sort: {
            channelVideoNumber: -1,
            publishedAt: -1,
        },
    };
};

const getChannelVideoNumberQuery = (req: express.Request): Document[] => {
    const { afterDate, title } = req.query;

    if (isString(title)) {
        return [{ $match: {} }];
    }

    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 3);

    return [
        {
            $match: {
                publishedAt: { $gte: minDate.toISOString().split('T')[0] },
            },
        },
        {
            $group: {
                _id: {
                    channelId: '$channelId',
                },
                videos: {
                    $push: '$$ROOT',
                },
                count: {
                    $sum: {
                        $cond: {
                            if: {
                                $and: [
                                    { $lt: ['$publishedAt', afterDate] },
                                    { $eq: ['$flagged', false] },
                                ],
                            },
                            then: 1,
                            else: 0,
                        },
                    },
                },
            },
        },
        {
            $unwind: '$videos',
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        '$videos',
                        {
                            channelVideoNumber: '$count',
                        },
                    ],
                },
            },
        },
    ];
};

const getNotBlacklistedQuery = (req: express.Request, collection?: string): Document[] => {
    const { blacklisted } = req.query;

    if (!collection || (isString(blacklisted) && blacklisted.toLowerCase() === 'false')) {
        return [];
    }

    return [
        {
            $lookup: {
                from: collection,
                localField: 'channelId',
                foreignField: '_id',
                as: 'blacklisted',
            },
        },
        {
            $match: {
                blacklisted: { $size: 0 },
            },
        },
        {
            $project: {
                blacklisted: 0,
            },
        },
    ];
};

export {
    getTitleQuery,
    getFlaggedQuery,
    getDateQuery,
    getSortQuery,
    getNotBlacklistedQuery,
    isString,
    getChannelVideoNumberQuery,
};
