// @ts-check

import log from "npmlog";

import cache from "../helpers/cache";
import findAgreements from "../libs/findAgreements";
import findCodes from "../libs/findCodes";
import getAgreementsArticles from "../libs/getAgreementsArticles";
import getCodesArticles from "../libs/getCodesArticles";

export default function seedCache() {
  if (process.env.TRAVIS === "true") return;

  // ==================================================
  // Agreements

  const indexedAgreements = findAgreements();
  for (const { id } of indexedAgreements) {
    log.info("helpers/seedCache.js", `Seeding agreement cache for ID=${id}…`);
    getAgreementsArticles(id);
  }

  // ==================================================
  // Codes

  const indexedCodes = findCodes();
  const filteredIndexedCodes = indexedCodes.filter(({ id }) => id === "LEGITEXT000006072050");
  for (const { id } of filteredIndexedCodes) {
    log.info("helpers/seedCache.js", `Seeding code cache for ID=${id}…`);
    getCodesArticles(id);
  }

  cache.set("isCached", true);
  log.info("helpers/seedCache.js", "Cache seeded.");
}
