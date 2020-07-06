// @ts-check

import { getIndexedArticle } from "@socialgouv/kali-data";

import ApiError from "./ApiError";
import getAgreementsArticles from "./getAgreementsArticles";

/**
 * Get an agreement article.
 *
 * @param {string} agreementArticleIdOrCid
 *
 * @returns {Promise<Api.Article>}
 */
export default async function getAgreementArticleByIdOrCid(agreementArticleIdOrCid) {
  const { agreementId, articleCid } = getIndexedArticle(agreementArticleIdOrCid);

  const maybeAgreementArticle = (await getAgreementsArticles(agreementId)).find(
    ({ cid }) => cid === articleCid,
  );
  if (maybeAgreementArticle === undefined) {
    throw new ApiError(
      `Couldn't find agreement article (CID=${articleCid}).`,
      404,
      "libs/getAgreementArticleByIdOrCid()",
    );
  }

  return maybeAgreementArticle;
}
