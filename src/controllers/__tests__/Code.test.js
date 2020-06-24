import Code from "../Code";

describe(`controllers/Code`, () => {
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
      it(`with a code ID`, () => {
        const ctx = {
          ...koaContextMock,
          params: {
            id: "LEGITEXT000006073189",
          },
        };

        Code.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          data: {
            id: "LEGITEXT000006073189",
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

        Code.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body.length).toBeGreaterThanOrEqual(1);
      });

      it(`with a query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            query: "sécurité sociale",
          },
        };

        Code.index(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toHaveLength(1);
        expect(ctx.body[0]).toMatchObject({
          id: "LEGITEXT000006073189",
        });
      });
    });

    describe(`should throw`, () => {
      it(`with a non-string <query> query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            query: 123,
          },
        };

        Code.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });
    });
  });
});
