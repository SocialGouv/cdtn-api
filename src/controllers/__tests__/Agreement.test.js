import Agreement from "../Agreement";

describe(`controllers/Agreement`, () => {
  const koaContextMock = {
    query: {},
    throw: jest.fn(),
  };

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with an agreement ID`, () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrIdcc: "KALICONT000005635091",
          },
        };

        Agreement.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          data: {
            id: "KALICONT000005635091",
            num: 2190,
          },
        });
      });

      it(`with an agreement IDCC`, () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrIdcc: "2190",
          },
        };

        Agreement.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          data: {
            id: "KALICONT000005635091",
            num: 2190,
          },
        });
      });
    });
  });

  describe(`#index()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with no query`, () => {
        const ctx = {
          ...koaContextMock,
        };

        Agreement.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body.length).toBeGreaterThanOrEqual(1);
      });

      it(`with a query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            query: "journalistes",
          },
        };

        Agreement.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toHaveLength(1);
        expect(ctx.body[0]).toMatchObject({
          id: "KALICONT000005635444",
          num: 1480,
        });
      });
    });
  });
});
