import answerWithError from "../../helpers/answerWithError";
import AgreementArticle from "../AgreementArticle";

jest.mock("../../helpers/answerWithError");

describe(`controllers/AgreementArticle`, () => {
  const koaContextMock = {
    params: {},
    query: {},
  };

  beforeEach(() => {
    answerWithError.mockReset();
  });

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with an agreement article CID`, async () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrCid: "KALIARTI000005781804",
          },
        };

        await AgreementArticle.get(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          cid: expect.any(String),
          containerId: expect.any(String),
          content: expect.any(String),
          id: expect.any(String),
          index: expect.any(String),
          path: expect.any(String),
        });
      });
    });
  });

  describe(`#index()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with an agreement ID`, async () => {
        const ctx = {
          ...koaContextMock,
          query: {
            agreementIdOrIdcc: "KALICONT000005635091",
            query: "1.2",
          },
        };

        await AgreementArticle.index(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body.length).toBeGreaterThanOrEqual(1);
        expect(ctx.body[0]).toMatchObject({
          cid: expect.any(String),
          containerId: expect.any(String),
          content: expect.any(String),
          id: expect.any(String),
          index: expect.any(String),
          path: expect.any(String),
        });
      });

      it(`with an agreement IDCC`, async () => {
        const ctx = {
          ...koaContextMock,
          query: {
            agreementIdOrIdcc: "2190",
            query: "1.2",
          },
        };

        await AgreementArticle.index(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body.length).toBeGreaterThanOrEqual(1);
        expect(ctx.body[0]).toMatchObject({
          cid: expect.any(String),
          containerId: expect.any(String),
          content: expect.any(String),
          id: expect.any(String),
          index: expect.any(String),
          path: expect.any(String),
        });
      });

      it(`with a comma-separated list of article CIDs`, async () => {
        const ctx = {
          ...koaContextMock,
          query: {
            articleIdsOrCids: "KALIARTI000020960580,KALIARTI000038632552",
          },
        };

        await AgreementArticle.index(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body.length).toBe(2);
        expect(ctx.body).toMatchObject([
          {
            cid: "KALIARTI000020960580",
            containerId: "KALICONT000005635091",
            content: expect.any(String),
            id: expect.any(String),
            index: expect.any(String),
            path: expect.any(String),
          },
          {
            cid: "KALIARTI000038632552",
            containerId: "KALICONT000038661444",
            content: expect.any(String),
            id: expect.any(String),
            index: expect.any(String),
            path: expect.any(String),
          },
        ]);
      });
    });

    describe(`should throw`, () => {
      it(`with an undefined <agreementIdOrIdcc> query AND an undefined <articleIdsOrCids>`, async () => {
        const ctx = {
          ...koaContextMock,
        };

        await AgreementArticle.index(ctx);

        expect(answerWithError).toHaveBeenCalledTimes(1);
      });

      describe(`with an <agreementIdOrIdcc> query`, () => {
        it(`but a non-string one`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              agreementIdOrIdcc: 123,
              query: "1.2",
            },
          };

          await AgreementArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });

        it(`and an undefined <query> query`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              agreementIdOrIdcc: "KALICONT000005635091",
            },
          };

          await AgreementArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });

        it(`and a non-string <query> query`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              agreementIdOrIdcc: "KALICONT000005635091",
              query: 123,
            },
          };

          await AgreementArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });
      });

      describe(`with an <articleIdsOrCids> query`, () => {
        it(`but a non-string one`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              articleIdsOrCids: 123,
            },
          };

          await AgreementArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });

        it(`but a malformed one`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              articleIdsOrCids: "A_MALFORMED_ID",
            },
          };

          await AgreementArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
