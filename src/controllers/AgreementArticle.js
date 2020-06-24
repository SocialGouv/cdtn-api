// @ts-check

import answerWithError from "../helpers/answerWithError";
import ApiError from "../libs/ApiError";
import findAgreementArticles from "../libs/findAgreementArticles";
import getAgreementArticleByIdOrCid from "../libs/getAgreementArticleByIdOrCid";

class AgreementArticle {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/agreement/article/KALIARTI000030641746
   */
  get(ctx) {
    try {
      const { idOrCid } = ctx.params;

      const body = getAgreementArticleByIdOrCid(idOrCid);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/AgreementArticle#get()", err, ctx);
    }
  }

  /**
   * Find an agreement article given a query string within the specified agreement idcc.
   *
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/agreement/articles?agreementIdOrIdcc=2190&query=1.2
   * - http://localhost:3000/agreement/articles?agreementIdOrIdcc=KALICONT000005635091&query=1.2
   */
  index(ctx) {
    try {
      const { agreementIdOrIdcc, query } = ctx.query;

      switch (true) {
        case typeof agreementIdOrIdcc === "undefined":
          throw new ApiError("The `agreementIdOrIdcc` query parameter is mandatory.", 422);

        case typeof agreementIdOrIdcc !== "string":
          throw new ApiError("The `agreementIdOrIdcc` query parameter must be a {string}.", 422);

        case typeof query === "undefined":
          throw new ApiError("The `query` query parameter is mandatory.", 422);

        case typeof query !== "string":
          throw new ApiError("The `query` query parameter must be a {string}.", 422);
      }

      const body = findAgreementArticles(agreementIdOrIdcc, query);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/AgreementArticle#index()", err, ctx);
    }
  }
}

export default new AgreementArticle();
