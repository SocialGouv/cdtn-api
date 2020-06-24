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
    });

    describe(`should throw`, () => {
      it(`with an undefined <agreementIdOrIdcc> query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            query: "1.2",
          },
        };

        AgreementArticle.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });

      it(`with a non-string <agreementIdOrIdcc> query`, () => {
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

      it(`with an undefined <query> query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            agreementIdOrIdcc: "KALICONT000005635091",
          },
        };

        AgreementArticle.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });

      it(`with a non-string <query> query`, () => {
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
  });
});
