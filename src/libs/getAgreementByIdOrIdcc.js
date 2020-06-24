// @ts-check

import { getAgreement } from "@socialgouv/kali-data";

import cache from "../helpers/cache";

/**
 * Get an agreement.
 *
 * @param {number | string} idOrIdcc
 *
 * @returns {KaliData.Agreement}
 */
export default function getAgreementByIdOrIdcc(idOrIdcc) {
  const cacheKey = `agreement-${idOrIdcc}`;

  // Return cached agreement if available:
  const maybeCachedAgreement = cache.get(cacheKey);
  if (maybeCachedAgreement !== undefined) {
    return maybeCachedAgreement;
  }

  const agreement = getAgreement(idOrIdcc);
  cache.set(cacheKey, agreement);

  return agreement;
}
