// @ts-check

import unistUtilFlatFilter from "unist-util-flat-filter";

import cache from "../helpers/cache";
import ApiError from "./ApiError";
import getCodeById from "./getCodeById";

/**
 *
 * @param {string} codeId
 * @param {LegiData.CodeArticle} codeArticle
 *
 * @returns {Api.Article}
 */
function convertCodeArticleToArticle(codeId, codeArticle) {
  const {
    data: { cid, id, num, texte },
  } = codeArticle;
  const containerId = codeId;
  const content = texte;
  const index = num !== undefined ? num : "";
  const path = "";

  return {
    cid,
    containerId,
    content,
    id,
    index,
    path,
  };
}

/**
 * @param {string} codeId
 *
 * @returns {Api.Article[]}
 */
export default function getCodesArticles(codeId) {
  try {
    const cacheKey = `codeArticles-${codeId}`;

    // Return cached articles if available for this code:
    const maybeCodeArticles = cache.get(cacheKey);
    if (maybeCodeArticles !== undefined) {
      return maybeCodeArticles;
    }

    const codeWithParentSections = getCodeById(codeId);

    const codeArticles =
      /** @type {{ children: LegiData.CodeArticle[], type: "root" }} */
      (/** @type {*} */ (unistUtilFlatFilter(codeWithParentSections, { type: "article" })));
    const articles = codeArticles.children.map(codeArticle =>
      convertCodeArticleToArticle(codeId, codeArticle),
    );
    cache.set(cacheKey, articles);

    return articles;
  } catch (err) {
    throw new ApiError(err.message, 500, "libs/getEnrichedAgreementsArticles()");
  }
}
