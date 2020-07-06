import cors from "@koa/cors";
import Koa from "koa";

import answerWithError from "./helpers/answerWithError";
import log from "./helpers/log";
import ApiError from "./libs/ApiError";
import router from "./middlewares/router";

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT || 3000);

const app = new Koa();
app.use(cors()).use(router.routes()).use(router.allowedMethods());
app.use(async ctx => {
  if (ctx.status === 404) {
    answerWithError(
      "index.js",
      new ApiError("This path does not exist or has been removed.", 404),
      ctx,
    );

    return;
  }
});

app.listen(PORT);
log.info("api", "Listening on %s (%s).", PORT, NODE_ENV);
