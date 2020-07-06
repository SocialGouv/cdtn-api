// @ts-check

import log from "./log";

/**
 * @param {string} path
 * @param {?} error
 * @param {import("koa").Context} ctx
 * @param {number=} code
 */
export default function answerWithError(path, error, ctx, code) {
  if (typeof error.code !== "number") {
    if (typeof code === "number") {
      error.code = code;
    } else {
      error.code = 500;
    }
  }

  const errorMessage =
    typeof error === "object" && typeof error.message === "string"
      ? // https://stackoverflow.com/a/37133017/2736233
        error.message.split("\n", 1)[0]
      : typeof error === "string"
      ? error
      : `Unknown error.`;

  const body = {
    error: errorMessage,
  };

  if (error.code >= 500) {
    log.error("api", `[${error.path || path}] Error: %s`, errorMessage);
    body.message = "Bad Request";
  }

  // ctx.set("Content-Type", "application/json; charset=utf-8");
  ctx.status = error.code;
  ctx.body = body;
}
