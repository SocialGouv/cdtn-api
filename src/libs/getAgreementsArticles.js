// @ts-check

import { getAgreementArticlesWithParentSections } from "@socialgouv/kali-data";

import cache from "../helpers/cache";
import convertHtmlToPlainText from "../helpers/convertHtmlToPlainText";
import ApiError from "./ApiError";
import getAgreementByIdOrIdcc from "./getAgreementByIdOrIdcc";

/**
 * @param {KaliData.AgreementArticleWithParentSections["sections"]} sections
 * @param {string=} num Article Index
 *
 * @returns {string}
 */
function generatePathFromSections(sections, num) {
  const pathChunks = sections
    .map(({ data: { title } }) => title)
    .filter(title => typeof title === "string" && title.trim().length !== 0)
    .map(title => title.trim().replace(/\s+/g, " "));

  if (typeof num === "string") {
    pathChunks.push(`Article ${num}`);
  }

  const path = pathChunks.join(" » ");

  return path;
}

/**
 *
 * @param {string} agreementId
 * @param {KaliData.AgreementArticleWithParentSections} agreementArticleWithParentSections
 *
 * @returns {Api.Article}
 */
function convertArticleWithParentSectionsToArticle(
  agreementId,
  agreementArticleWithParentSections,
) {
  const {
    data: { cid, id, num },
    sections,
  } = agreementArticleWithParentSections;
  const containerId = agreementId;
  const content = convertHtmlToPlainText(agreementArticleWithParentSections.data.content);
  const index = num !== undefined ? num : "";
  const path = generatePathFromSections(sections, num);

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
 * @returns {Api.Article[]}
 */
export default function getAgreementsArticles(agreementIdOrIdcc) {
  try {
    // Use internal lib to take advantage of cache:
    const agreement = getAgreementByIdOrIdcc(agreementIdOrIdcc);
    const agreementId = agreement.data.id;
    const cacheKey = `agreementArticles-${agreementId}`;

    // Return cached enriched articles if available for this agreement:
    const maybeCachedEnrichedAgreementArticles = cache.get(cacheKey);
    if (maybeCachedEnrichedAgreementArticles !== undefined) {
      return maybeCachedEnrichedAgreementArticles;
    }

    const articlesWithParentSections = getAgreementArticlesWithParentSections(agreementId);

    const articles = articlesWithParentSections.map(articleWithParentSections =>
      convertArticleWithParentSectionsToArticle(agreementId, articleWithParentSections),
    );
    cache.set(cacheKey, articles);

    return articles;
  } catch (err) {
    throw new ApiError(err.message, 500, "libs/getEnrichedAgreementsArticles()");
  }
}
