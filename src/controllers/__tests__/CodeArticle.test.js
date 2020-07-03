import CodeArticle from "../CodeArticle";

describe(`controllers/CodeArticle`, () => {
  const koaContextMock = {
    params: {},
    query: {},
    throw: jest.fn(),
  };

  beforeEach(() => {
    koaContextMock.throw.mockReset();
  });

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with a code article CID`, () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrCid: "LEGIARTI000006901112",
          },
        };

        CodeArticle.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
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
      it(`with a code ID`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            codeId: "LEGITEXT000006072050",
            query: "L1234",
          },
        };

        CodeArticle.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
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

      it(`with a comma-separated list of article CIDs`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            articleIdsOrCids: "LEGIARTI000006901112,LEGIARTI000006901119",
          },
        };

        CodeArticle.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
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
      it(`with an undefined <codeId> query AND an undefined <articleIdsOrCids>`, () => {
        const ctx = {
          ...koaContextMock,
        };

        CodeArticle.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });

      describe(`with an <codeId> query`, () => {
        it(`but a non-string one`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              codeId: 123,
              query: "1.2",
            },
          };

          CodeArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });

        it(`and an undefined <query> query`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              codeId: "KALICONT000005635091",
            },
          };

          CodeArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });

        it(`and a non-string <query> query`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              codeId: "KALICONT000005635091",
              query: 123,
            },
          };

          CodeArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });
      });

      describe(`with an <articleIdsOrCids> query`, () => {
        it(`but a non-string one`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              articleIdsOrCids: 123,
            },
          };

          CodeArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });

        it(`but a malformed one`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              articleIdsOrCids: "A_MALFORMED_ID",
            },
          };

          CodeArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
