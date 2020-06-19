// @ts-check

/** @type {typeof Fuse.default} */
import FuseJs from "fuse.js";

import cleanQuery from "../helpers/cleanQuery";
import smartenArticleQuery from "../helpers/smartenArticleQuery";
import getCodesArticles from "./getCodesArticles";

/**
 * @param {string} codeId
 * @param {string} query
 *
 * @returns {LegiData.CodeArticleData[]}
 *
 * TODO Extract query cleaning into a separate helper.
 */
export default function findAgreementArticles(codeId, query) {
  const articles = getCodesArticles(codeId);
  const cleanedQuery = cleanQuery(query);
  const smartQuery = smartenArticleQuery(cleanedQuery);

  /** @type {Fuse.default.IFuseOptions<LegiData.CodeArticleData>} */
  const fuseJsOptions = {
    distance: 999,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    isCaseSensitive: false,
    keys: ["num"],
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.5,
    useExtendedSearch: true,
  };

  const fuseJs = new FuseJs(articles, fuseJsOptions);
  const foundArticles =
    /** @type {Fuse.default.FuseResult<LegiData.CodeArticleData>[]} */
    (fuseJs.search(smartQuery)).slice(0, 10).map(({ item }) => item);

  return foundArticles;
}
