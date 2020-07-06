// @ts-check

import answerWithError from "../helpers/answerWithError";
import ApiError from "../libs/ApiError";
import findCodes from "../libs/findCodes";
import getCodeById from "../libs/getCodeById";

class Agreement {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/code/LEGITEXT000006072050
   */
  async get(ctx) {
    try {
      const { id } = ctx.params;

      const body = await getCodeById(id);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/Agreement#get()", err, ctx, 400);
    }
  }

  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/codes
   * - http://localhost:3000/codes?&query=s%C3%A9curit%C3%A9%20sociale
   */
  index(ctx) {
    try {
      const { query } = ctx.query;

      switch (true) {
        case query !== undefined && typeof query !== "string":
          throw new ApiError("When provided, the `query` query parameter must be a {string}.", 422);
      }

      const body = findCodes(query);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/Agreement#index()", err, ctx, 400);
    }
  }
}

export default new Agreement();
