import express from "express";

import captionsRouter from '@/modules/captions/captions-router.js'
import searchRouter from '@/modules/search/search-router.js'

const router = express.Router({ mergeParams: true }) as express.Router;

router.use('/captions', captionsRouter);
router.use('/search', searchRouter);

export default router
