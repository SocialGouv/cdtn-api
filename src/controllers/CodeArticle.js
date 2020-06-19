// @ts-check

import { getArticleWithParentSections } from "@socialgouv/legi-data";

import answerWithError from "../helpers/answerWithError";
import ApiError from "../libs/ApiError";
import findCodeArticles from "../libs/findCodeArticles";

class CodeArticle {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/article/LEGIARTI000006901112
   */
  get(ctx) {
    try {
      const { idOrcid } = ctx.params;

      const body = getArticleWithParentSections(idOrcid);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/CodeArticle#get()", err, ctx);
    }
  }

  /**
   * Find an agreement article given a query string within the specified agreement idcc.
   *
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/code/articles?codeId=LEGITEXT000006072050&query=L1234
   */
  index(ctx) {
    try {
      const { codeId, query } = ctx.query;

      switch (true) {
        case typeof codeId === "undefined":
          throw new ApiError("The `codeId` query parameter is mandatory.", 422);

        case typeof codeId !== "string":
          throw new ApiError("The `codeId` query parameter must be a {string}.", 422);

        case typeof query === "undefined":
          throw new ApiError("The `query` query parameter is mandatory.", 422);

        case typeof query !== "string":
          throw new ApiError("The `query` query parameter must be a {string}.", 422);
      }

      const body = findCodeArticles(codeId, query);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/CodeArticle#index()", err, ctx);
    }
  }
}

export default new CodeArticle();
