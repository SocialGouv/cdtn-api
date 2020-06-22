import KoaRouter from "@koa/router";

import AgreementController from "../controllers/Agreement";
import AgreementArticleController from "../controllers/AgreementArticle";
import CodeController from "../controllers/Code";
import CodeArticleController from "../controllers/CodeArticle";
import HealthController from "../controllers/Health";
import IndexController from "../controllers/Index";

const router = new KoaRouter();

router.get("/", IndexController.get);

router.get("/agreement/article/:idOrcid", AgreementArticleController.get);
router.get("/agreement/articles", AgreementArticleController.index);

router.get("/agreement/:idOrIdcc", AgreementController.get);
router.get("/agreements", AgreementController.index);

router.get("/code/article/:idOrcid", CodeArticleController.get);
router.get("/code/articles", CodeArticleController.index);

router.get("/code/:id", CodeController.get);
router.get("/codes", CodeController.index);

router.get("/healthz", HealthController.get);

export default router;
