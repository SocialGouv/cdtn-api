// @ts-check

import { getIndexedCodes } from "@socialgouv/legi-data";
import FuseJs from "fuse.js";

import cleanQuery from "../helpers/cleanQuery";

/**
 * @param {string=} query
 *
 * @returns {LegiData.IndexedCode[]}
 */
export default function findAgreements(query) {
  const indexedCodes = getIndexedCodes();

  if (query === undefined) {
    return indexedCodes;
  }

  const cleanedQuery = cleanQuery(query);

  /** @type {Fuse.default.IFuseOptions<LegiData.IndexedCode>} */
  const fuseJsOptions = {
    distance: 999,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    isCaseSensitive: false,
    keys: ["titre"],
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.5,
    useExtendedSearch: true,
  };

  const fuseJs = new FuseJs(indexedCodes, fuseJsOptions);
  const foundAgreements =
    /** @type {Fuse.default.FuseResult<LegiData.IndexedCode>[]} */
    (fuseJs.search(cleanedQuery)).slice(0, 10).map(({ item }) => item);

  return foundAgreements;
}
