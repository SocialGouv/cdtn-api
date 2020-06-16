class Health {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/healthz
   *
   * @see https://swagger.io/docs/specification/about/
   */
  get(ctx) {
    ctx.body = { success: true };
  }
}

export default new Health();
