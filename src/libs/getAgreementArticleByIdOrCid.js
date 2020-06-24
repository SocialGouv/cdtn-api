// @ts-check

import { getArticleWithParentSections, getIndexedArticle } from "@socialgouv/kali-data";

import cache from "../helpers/cache";
import convertHtmlToPlainText from "../helpers/convertHtmlToPlainText";

/**
 * Get an agreement article.
 *
 * @param {string} idOrCid
 *
 * @returns {Api.Article}
 */
export default function getAgreementArticleByIdOrCid(idOrCid) {
  const cacheKey = `agreementArticle-${idOrCid}`;

  // Return cached agreement article if available:
  const maybeCachedArticle = cache.get(cacheKey);
  if (maybeCachedArticle !== undefined) {
    return maybeCachedArticle;
  }

  const indexedAgreementArticle = getIndexedArticle(idOrCid);
  const agreementArticle = getArticleWithParentSections(idOrCid);
  const {
    data: { cid, id, num },
    sections,
  } = agreementArticle;
  const containerId = indexedAgreementArticle.agreementId;
  const content = convertHtmlToPlainText(agreementArticle.data.content);
  const index = num !== undefined ? num : "";
  const path = sections.map(({ data: { title } }) => title).join(" » ");
  /** @type {Api.Article} */
  const article = {
    cid,
    containerId,
    content,
    id,
    index,
    path,
  };
  cache.set(cacheKey, article);

  return article;
}
