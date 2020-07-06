// @ts-check

import { getAgreement, getAgreementIdFromIdOrIdcc } from "@socialgouv/kali-data";

import cache from "../helpers/cache";

/**
 * Get an agreement.
 *
 * @param {number | string} idOrIdcc
 *
 * @returns {Promise<KaliData.Agreement>}
 */
export default async function getAgreementByIdOrIdcc(idOrIdcc) {
  const id = getAgreementIdFromIdOrIdcc(idOrIdcc);
  const cacheKey = `AGREEMENT:${id}`;

  // Return cached agreement if available:
  const maybeCachedAgreement = await cache.get(cacheKey);
  if (maybeCachedAgreement !== null) {
    return maybeCachedAgreement;
  }

  const agreement = getAgreement(id);
  cache.set(cacheKey, agreement);

  return agreement;
}
