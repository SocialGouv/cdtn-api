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
  async get(ctx) {
    try {
      const { idOrCid } = ctx.params;

      const body = await getAgreementArticleByIdOrCid(idOrCid);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/AgreementArticle#get()", err, ctx, 400);
    }
  }

  /**
   * Find agreement articles given a query string within the specified agreement ID or IDCC.
   *
   * OR
   *
   * Get a list of agreement articles given a comma-separated list of article IDs or CIDs.
   *
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/agreement/articles?agreementIdOrIdcc=2190&query=1.2
   * - http://localhost:3000/agreement/articles?agreementIdOrIdcc=KALICONT000005635091&query=1.2
   * - http://localhost:3000/agreement/articles?articleIdsOrCids=KALIARTI000020960580,KALIARTI000038632552
   */
  async index(ctx) {
    try {
      const { agreementIdOrIdcc, articleIdsOrCids, query } = ctx.query;

      switch (true) {
        case typeof agreementIdOrIdcc === "undefined" && typeof articleIdsOrCids === "undefined":
          throw new ApiError(
            "At least one of `agreementIdOrIdcc`, `articleIdsOrCids` query parameters is mandatory.",
            422,
          );

        case typeof agreementIdOrIdcc !== "undefined" && typeof agreementIdOrIdcc !== "string":
          throw new ApiError("The `agreementIdOrIdcc` query parameter must be a {string}.", 422);

        case typeof agreementIdOrIdcc !== "undefined" && typeof query === "undefined":
          throw new ApiError("The `query` query parameter is mandatory.", 422);

        case typeof agreementIdOrIdcc !== "undefined" && typeof query !== "string":
          throw new ApiError("The `query` query parameter must be a {string}.", 422);

        case typeof articleIdsOrCids !== "undefined" && typeof articleIdsOrCids !== "string":
          throw new ApiError("The `articleIdsOrCids` query parameter must be a {string}.", 422);

        case typeof articleIdsOrCids !== "undefined" &&
          !/^KALIARTI\d{12}(,KALIARTI\d{12})*$/.test(articleIdsOrCids):
          throw new ApiError(
            "The `articleIdsOrCids` query parameter must be comma-separated list of agreement article IDs or CIDs.",
            422,
          );
      }

      const body =
        agreementIdOrIdcc !== undefined
          ? await findAgreementArticles(agreementIdOrIdcc, query)
          : await Promise.all(articleIdsOrCids.split(",").map(getAgreementArticleByIdOrCid));

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/AgreementArticle#index()", err, ctx, 400);
    }
  }
}

export default new AgreementArticle();
