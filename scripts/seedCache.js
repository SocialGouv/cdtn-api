import axios from "axios";
import log from "npmlog";
import waitOn from "wait-on";

const PORT = Number(process.env.PORT || 3000);
const BASE_URL = `http://localhost:${PORT}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

async function seedCache() {
  if (process.env.TRAVIS === "true") {
    await axiosInstance.post("/ready");

    return;
  }

  // ==================================================
  // Agreements

  const { data: indexedAgreements } = await axiosInstance.get("/agreements");
  for (const { id } of indexedAgreements) {
    log.info("scripts/seedCache.js", `Seeding agreement cache for ID=${id}…`);
    await axiosInstance.get(`/agreement/articles?agreementIdOrIdcc=${id}&query=1`);
  }

  // ==================================================
  // Codes

  const { data: indexedCodes } = await axiosInstance.get("/codes");
  const filteredIndexedCodes = indexedCodes.filter(({ id }) => id === "LEGITEXT000006072050");
  for (const { id } of filteredIndexedCodes) {
    log.info("scripts/seedCache.js", `Seeding code cache for ID=${id}…`);
    await axiosInstance.get(`/code/articles?codeId=${id}&query=1`);
  }

  await axiosInstance.post("/ready");
  log.info("scripts/seedCache.js", "Cache seeded.");
}

waitOn(
  {
    resources: [BASE_URL],
    timeout: 60000,
  },
  err => {
    if (err !== undefined) {
      log.err("scripts/seedCache.js", err);
      process.exit(1);
    }

    seedCache();
  },
);
