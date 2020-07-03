class Health {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/healthz
   */
  get(ctx) {
    ctx.body = { success: true };
  }
}

export default new Health();
