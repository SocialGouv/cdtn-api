// @ts-check

import cache from "../src/helpers/cache";
import log from "../src/helpers/log";
import findAgreements from "../src/libs/findAgreements";
import findCodes from "../src/libs/findCodes";
import getAgreementsArticles from "../src/libs/getAgreementsArticles";
import getCodesArticles from "../src/libs/getCodesArticles";

/**
 * @param {string} id
 *
 * @returns {boolean}
 */
const isAgreementId = id => typeof id === "string" && /^KALICONT\d{12}$/.test(id);

(async () => {
  try {
    const start = process.hrtime();

    // ==================================================
    // Agreements

    const indexedAgreements = findAgreements();
    const filteredIndexedAgreements = indexedAgreements.filter(({ id }) => isAgreementId(id));
    let iMax = filteredIndexedAgreements.length;
    let i = -1;
    while (++i < iMax) {
      const { id } = filteredIndexedAgreements[i];
      const index = `[${String(i + 1).padStart(3, "0")}/${iMax}]`;

      log.info("scripts/updateCache.js", `${index} Cleaning agreement cache for ID=${id}…`);
      await cache.unsetAll([`AGREEMENT:${id}`, `AGREEMENT:${id}:ARTICLES`]);
      log.info("scripts/updateCache.js", `${index} Agreement cache cleaned for ID=${id}.`);

      log.info("scripts/updateCache.js", `${index} Updating agreement cache for ID=${id}…`);
      await getAgreementsArticles(id);
      log.info("scripts/updateCache.js", `${index} Agreement cache updated for ID=${id}.`);
    }

    // ==================================================
    // Codes

    const indexedCodes = findCodes();
    const filteredIndexedCodes = indexedCodes.filter(({ id }) => id === "LEGITEXT000006072050");
    iMax = filteredIndexedCodes.length;
    i = -1;
    while (++i < iMax) {
      const { id } = filteredIndexedCodes[i];
      const index = `[${String(i + 1).padStart(3, "0")}/${iMax}]`;

      log.info("scripts/updateCache.js", `${index} Cleaning code cache for ID=${id}…`);
      await cache.unsetAll([`CODE:${id}`, `CODE:${id}:ARTICLES`]);
      log.info("scripts/updateCache.js", `${index} Code cache cleaned for ID=${id}.`);

      log.info("scripts/updateCache.js", `${index} Updating code cache for ID=${id}…`);
      await getCodesArticles(id);
      log.info("scripts/updateCache.js", `${index} Code cache updated for ID=${id}.`);
    }

    // Used by /ready to answer with 200 instead of 404:
    cache.set("isCached", true);

    const end = process.hrtime(start);
    log.info("scripts/updateCache.js", "Cache updated in %ds %dms.", end[0], end[1] / 1000000);
  } catch (err) {
    log.error("scripts/updateCache.js", err);
  }

  try {
    await cache.close();
  } catch (err) {
    log.error("scripts/updateCache.js", err);
  }
})();
