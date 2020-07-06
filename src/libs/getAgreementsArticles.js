// @ts-check

import { getAgreementArticlesWithPath } from "@socialgouv/kali-data";

import cache from "../helpers/cache";
import convertHtmlToPlainText from "../helpers/convertHtmlToPlainText";
import ApiError from "./ApiError";
import getAgreementByIdOrIdcc from "./getAgreementByIdOrIdcc";

/**
 * @param {string} agreementId
 * @param {KaliData.AgreementArticleWithPath} agreementArticleWithPath
 *
 * @returns {Api.Article}
 */
function normalizeArticle(agreementId, agreementArticleWithPath) {
  const {
    data: { cid, id, num },
  } = agreementArticleWithPath;
  const containerId = agreementId;
  const content = convertHtmlToPlainText(agreementArticleWithPath.data.content);
  const index = num !== undefined ? num : "";
  const path = agreementArticleWithPath.path.join(" » ");

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
 * @param {string} agreementIdOrIdcc
 *
 * @returns {Promise<Api.Article[]>}
 */
export default async function getAgreementsArticles(agreementIdOrIdcc) {
  try {
    // Use internal lib to take advantage of cache:
    const agreement = await getAgreementByIdOrIdcc(agreementIdOrIdcc);
    const agreementId = agreement.data.id;
    const cacheKey = `AGREEMENT:${agreementId}:ARTICLES`;

    // Return cached articles if available for this agreement:
    const maybeCachedAgreementArticles = await cache.get(cacheKey);
    if (maybeCachedAgreementArticles !== null) {
      return maybeCachedAgreementArticles;
    }

    const articlesWithPath = getAgreementArticlesWithPath(agreementId);

    const articles = articlesWithPath.map(articleWithParentSections =>
      normalizeArticle(agreementId, articleWithParentSections),
    );
    cache.set(cacheKey, articles);

    return articles;
  } catch (err) {
    throw new ApiError(err.message, 400, "libs/getAgreementsArticles()");
  }
}
