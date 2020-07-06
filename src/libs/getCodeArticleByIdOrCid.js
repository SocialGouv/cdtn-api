// @ts-check

import { getIndexedArticle } from "@socialgouv/legi-data";

import ApiError from "./ApiError";
import getCodesArticles from "./getCodesArticles";

/**
 * Get a code article.
 *
 * @param {string} codeArticleIdOrCid
 *
 * @returns {Promise<Api.Article>}
 */
export default async function getCodeArticleByIdOrCid(codeArticleIdOrCid) {
  const { articleCid, codeId } = getIndexedArticle(codeArticleIdOrCid);

  const maybeCodeArticle = (await getCodesArticles(codeId)).find(({ cid }) => cid === articleCid);
  if (maybeCodeArticle === undefined) {
    throw new ApiError(
      `Couldn't find code article (CID=${articleCid}).`,
      404,
      "libs/getCodeArticleByIdOrCid()",
    );
  }

  return maybeCodeArticle;
}
