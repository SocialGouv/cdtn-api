// @ts-check

import { getCodeWithParents } from "@socialgouv/legi-data";

import cache from "../helpers/cache";

/**
 * Get a code.
 *
 * @param {string} id
 *
 * @returns {Promise<LegiData.CodeWithParents>}
 */
export default async function getCodeById(id) {
  const cacheKey = `CODE:${id}`;

  // Return cached agreement if available:
  const maybeCachedCode = await cache.get(cacheKey);
  if (maybeCachedCode !== null) {
    return maybeCachedCode;
  }

  const code = getCodeWithParents(id);
  cache.set(cacheKey, code);

  return code;
}
