// @ts-check

import unistUtilFlatFilter from "unist-util-flat-filter";

import cache from "../helpers/cache";
import ApiError from "./ApiError";
import getCodeById from "./getCodeById";

/**
 * @param {string} codeId
 *
 * @returns {LegiData.CodeArticleData[]}
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
    const codeArticlesData = codeArticles.children.map(({ data }) => data);

    cache.set(cacheKey, codeArticles);

    return codeArticlesData;
  } catch (err) {
    throw new ApiError(err.message, 500, "libs/getEnrichedAgreementsArticles()");
  }
}
