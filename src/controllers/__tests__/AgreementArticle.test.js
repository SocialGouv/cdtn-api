import AgreementArticle from "../AgreementArticle";

describe(`controllers/AgreementArticle`, () => {
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
      it(`with an agreement article CID`, () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrCid: "KALIARTI000005781804",
          },
        };

        AgreementArticle.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
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
      it(`with an agreement ID`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            agreementIdOrIdcc: "KALICONT000005635091",
            query: "1.2",
          },
        };

        AgreementArticle.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
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

      it(`with an agreement IDCC`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            agreementIdOrIdcc: "2190",
            query: "1.2",
          },
        };

        AgreementArticle.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
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

      it(`with a comma-separated list of article CIDs`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            articleIdsOrCids: "KALIARTI000020960580,KALIARTI000038632552",
          },
        };

        AgreementArticle.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
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
      it(`with an undefined <agreementIdOrIdcc> query AND an undefined <articleIdsOrCids>`, () => {
        const ctx = {
          ...koaContextMock,
        };

        AgreementArticle.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });

      describe(`with an <agreementIdOrIdcc> query`, () => {
        it(`but a non-string one`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              agreementIdOrIdcc: 123,
              query: "1.2",
            },
          };

          AgreementArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });

        it(`and an undefined <query> query`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              agreementIdOrIdcc: "KALICONT000005635091",
            },
          };

          AgreementArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });

        it(`and a non-string <query> query`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              agreementIdOrIdcc: "KALICONT000005635091",
              query: 123,
            },
          };

          AgreementArticle.index(ctx);

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

          AgreementArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });

        it(`but a malformed one`, () => {
          const ctx = {
            ...koaContextMock,
            query: {
              articleIdsOrCids: "A_MALFORMED_ID",
            },
          };

          AgreementArticle.index(ctx);

          expect(ctx.throw).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
