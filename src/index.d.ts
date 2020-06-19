import "@socialgouv/kali-data";

export as namespace Api;

type EnrichedAgreementArticle = KaliData.AgreementArticleData & {
  /** Sections path. */
  path: string;
};

type EnrichedCodeArticle = LegiData.AgreementArticleData & {
  /** Sections path. */
  path: string;
};
