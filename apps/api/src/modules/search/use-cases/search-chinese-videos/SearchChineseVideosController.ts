import express from "express";

import AbstractController from "@/modules/abstract/AbstractController.js";

import { MongoService } from '@elyse0/mongo-service';

import {
    getTitleQuery,
    getFlaggedQuery,
    getDateQuery,
    getNotBlacklistedQuery,
    getSortQuery,
    getChannelVideoNumberQuery,
} from '@/utils/queries.js'

import { isString } from '@/utils/validation.js';

class SearchChineseVideosController extends AbstractController {

    protected async executeImpl(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const getLanguageConfig = (language: string) => {
                if (language === 'french') {
                    return {
                        channelBlacklist: 'frenchBlacklist',
                        videoCollection: 'french',
                    };
                }

                if (language === 'chinese') {
                    return {
                        videoCollection: 'chinese',
                    };
                }

                return null;
            }

            const { language } = req.params;
            if (!isString(language)) {
                return this.clientError(res, 'Please provide a valid target \'language\'');
            }

            const languageConfig = getLanguageConfig(language);
            if (!languageConfig) {
                return res.status(400).json({ message: 'Language is not supported' });
            }

            const titleQuery = getTitleQuery(req);
            const flaggedQuery = getFlaggedQuery(req);
            const dateQuery = getDateQuery(req);
            const notBlacklistedQuery = getNotBlacklistedQuery(req, languageConfig.channelBlacklist);
            const sortQuery = getSortQuery(req);

            const database = await MongoService.create();
            const videos = await database.aggregation(
                languageConfig.videoCollection,
                [
                    titleQuery,
                    //...getChannelVideoNumberQuery(req),
                    flaggedQuery,
                    dateQuery,
                    //...notBlacklistedQuery,
                    sortQuery,
                ],
            );

            await database.disconnect();

            if (!videos.length) {
                return this.notFound(res, 'There are no videos');
            }

            return this.ok(res, videos)
        } catch (err) {
            return this.fail(res, err);
        }
    }
}

export default SearchChineseVideosController;
