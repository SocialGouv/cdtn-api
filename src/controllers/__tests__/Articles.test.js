import Article from "../Article";

describe(`controllers/Article`, () => {
  const koaContextMock = {
    throw: jest.fn(),
  };

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with an article CID`, () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrcid: "KALIARTI000005781804",
          },
        };

        Article.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          data: {
            cid: "KALIARTI000005781804",
            id: expect.any(String),
          },
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

        Article.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body.length).toBeGreaterThanOrEqual(1);
      });

      it(`with an agreement IDCC`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            agreementIdOrIdcc: "2190",
            query: "1.2",
          },
        };

        Article.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body.length).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
