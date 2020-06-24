import "@socialgouv/kali-data";

export as namespace Api;

type Article = {
  /** DILA ID. */
  cid: string;
  /** Agreement or Code DILA ID. */
  containerId: string;
  /** Plain text content. */
  content: string;
  /** DILA CID. */
  id: string;
  /**
   * Index.
   *
   * @example
   * - "12"
   * - "1.2.3"
   * - "L1234-5"
   */
  index: string;
  /** Sections path. */
  path: string;
};

type EnrichedAgreementArticle = KaliData.AgreementArticleData & {
  /** Sections path. */
  path: string;
};

type EnrichedCodeArticle = LegiData.AgreementArticleData & {
  /** Sections path. */
  path: string;
};
