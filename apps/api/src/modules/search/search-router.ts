import express from "express";

import searchChineseVideosController from "@/modules/search/use-cases/search-chinese-videos/index.js";

const router = express.Router() as express.Router;

router.get('/:language', (req: express.Request, res: express.Response) => {
    return searchChineseVideosController.execute(req, res);
})

export default router;
