import answerWithError from "../../helpers/answerWithError";
import CodeArticle from "../CodeArticle";

jest.mock("../../helpers/answerWithError");

describe(`controllers/CodeArticle`, () => {
  const koaContextMock = {
    params: {},
    query: {},
  };

  beforeEach(() => {
    answerWithError.mockReset();
  });

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with a code article CID`, async () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrCid: "LEGIARTI000006901112",
          },
        };

        await CodeArticle.get(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          cid: "LEGIARTI000006901112",
          containerId: "LEGITEXT000006072050",
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
      it(`with a code ID`, async () => {
        const ctx = {
          ...koaContextMock,
          query: {
            codeId: "LEGITEXT000006072050",
            query: "L1234",
          },
        };

        await CodeArticle.index(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body.length).toBeGreaterThanOrEqual(1);
        expect(ctx.body[0]).toMatchObject({
          cid: "LEGIARTI000006901112",
          containerId: "LEGITEXT000006072050",
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
            articleIdsOrCids: "LEGIARTI000006901112,LEGIARTI000006901119",
          },
        };

        await CodeArticle.index(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body.length).toBe(2);
        expect(ctx.body).toMatchObject([
          {
            cid: "LEGIARTI000006901112",
            containerId: "LEGITEXT000006072050",
            content: expect.any(String),
            id: expect.any(String),
            index: expect.any(String),
            path: expect.any(String),
          },
          {
            cid: "LEGIARTI000006901119",
            containerId: "LEGITEXT000006072050",
            content: expect.any(String),
            id: expect.any(String),
            index: expect.any(String),
            path: expect.any(String),
          },
        ]);
      });
    });

    describe(`should throw`, () => {
      it(`with an undefined <codeId> query AND an undefined <articleIdsOrCids>`, async () => {
        const ctx = {
          ...koaContextMock,
        };

        await CodeArticle.index(ctx);

        expect(answerWithError).toHaveBeenCalledTimes(1);
      });

      describe(`with an <codeId> query`, () => {
        it(`but a non-string one`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              codeId: 123,
              query: "1.2",
            },
          };

          await CodeArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });

        it(`and an undefined <query> query`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              codeId: "KALICONT000005635091",
            },
          };

          await CodeArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });

        it(`and a non-string <query> query`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              codeId: "KALICONT000005635091",
              query: 123,
            },
          };

          await CodeArticle.index(ctx);

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

          await CodeArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });

        it(`but a malformed one`, async () => {
          const ctx = {
            ...koaContextMock,
            query: {
              articleIdsOrCids: "A_MALFORMED_ID",
            },
          };

          await CodeArticle.index(ctx);

          expect(answerWithError).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
