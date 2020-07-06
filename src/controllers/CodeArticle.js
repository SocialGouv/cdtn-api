// @ts-check

import answerWithError from "../helpers/answerWithError";
import ApiError from "../libs/ApiError";
import findCodeArticles from "../libs/findCodeArticles";
import getCodeArticleByIdOrCid from "../libs/getCodeArticleByIdOrCid";

class CodeArticle {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/code/article/LEGIARTI000006901112
   */
  async get(ctx) {
    try {
      const { idOrCid } = ctx.params;

      const body = await getCodeArticleByIdOrCid(idOrCid);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/CodeArticle#get()", err, ctx, 400);
    }
  }

  /**
   * Find an agreement article given a query string within the specified agreement idcc.
   *
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/code/articles?codeId=LEGITEXT000006072050&query=L1234
   * - http://localhost:3000/code/articles?articleIdsOrCids=LEGIARTI000006901112,LEGIARTI000006901119
   */
  async index(ctx) {
    try {
      const { articleIdsOrCids, codeId, query } = ctx.query;

      switch (true) {
        case typeof codeId === "undefined" && typeof articleIdsOrCids === "undefined":
          throw new ApiError(
            "At least one of `codeId`, `articleIdsOrCids` query parameters is mandatory.",
            422,
          );

        case typeof codeId !== "undefined" && typeof codeId !== "string":
          throw new ApiError("The `codeId` query parameter must be a {string}.", 422);

        case typeof codeId !== "undefined" && typeof query === "undefined":
          throw new ApiError("The `query` query parameter is mandatory.", 422);

        case typeof codeId !== "undefined" && typeof query !== "string":
          throw new ApiError("The `query` query parameter must be a {string}.", 422);

        case typeof articleIdsOrCids !== "undefined" && typeof articleIdsOrCids !== "string":
          throw new ApiError("The `articleIdsOrCids` query parameter must be a {string}.", 422);

        case typeof articleIdsOrCids !== "undefined" &&
          !/^LEGIARTI\d{12}(,LEGIARTI\d{12})*$/.test(articleIdsOrCids):
          throw new ApiError(
            "The `articleIdsOrCids` query parameter must be comma-separated list of code article IDs or CIDs.",
            422,
          );
      }

      const body =
        codeId !== undefined
          ? await findCodeArticles(codeId, query)
          : await Promise.all(articleIdsOrCids.split(",").map(getCodeArticleByIdOrCid));

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/CodeArticle#index()", err, ctx, 400);
    }
  }
}

export default new CodeArticle();
