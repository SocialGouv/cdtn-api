// @ts-check

import { getArticleWithParentSections, getIndexedArticle } from "@socialgouv/legi-data";

import cache from "../helpers/cache";

/**
 * Get a code article.
 *
 * @param {string} idOrCid
 *
 * @returns {Api.Article}
 */
export default function getCodeArticleByIdOrCid(idOrCid) {
  const cacheKey = `codeArticle-${idOrCid}`;

  // Return cached code article if available:
  const maybeCachedCodeArticle = cache.get(cacheKey);
  if (maybeCachedCodeArticle !== undefined) {
    return maybeCachedCodeArticle;
  }

  const indexedCodeArticle = getIndexedArticle(idOrCid);
  const codeArticle = getArticleWithParentSections(idOrCid);

  const {
    data: { cid, id, num, texte },
    sections,
  } = codeArticle;
  const containerId = indexedCodeArticle.codeId;
  const content = texte;
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
