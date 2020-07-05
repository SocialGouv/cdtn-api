import cache from "../helpers/cache";

class Ready {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/ready
   */
  get(ctx) {
    if (cache.get("isCached") === undefined) {
      ctx.throw(404);
    }

    ctx.statusCode = 200;
    ctx.body = {};
  }
}

export default new Ready();
