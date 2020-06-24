// @ts-check

import { getCodeWithParents } from "@socialgouv/legi-data";

import cache from "../helpers/cache";

/**
 * Get a code.
 *
 * @param {string} id
 *
 * @returns {LegiData.CodeWithParents}
 */
export default function getCodeById(id) {
  const cacheKey = `code-${id}`;

  // Return cached agreement if available:
  const maybeCachedCode = cache.get(cacheKey);
  if (maybeCachedCode !== undefined) {
    return maybeCachedCode;
  }

  const code = getCodeWithParents(id);
  cache.set(cacheKey, code);

  return code;
}
