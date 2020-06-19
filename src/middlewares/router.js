import KoaRouter from "@koa/router";

import AgreementController from "../controllers/Agreement";
import ArticleController from "../controllers/Article";
import HealthController from "../controllers/Health";
import IndexController from "../controllers/Index";

const router = new KoaRouter();

router.get("/", IndexController.get);
router.get("/healthz", HealthController.get);
router.get("/agreement/:idOrIdcc", AgreementController.get);
router.get("/agreements", AgreementController.index);
router.get("/article/:idOrcid", ArticleController.get);
router.get("/articles", ArticleController.index);

export default router;
