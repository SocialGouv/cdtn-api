import Index from "../Index";

describe(`controllers/Index`, () => {
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
        };

        Index.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          basePath: expect.any(String),
          definitions: expect.any(Object),
          host: expect.any(String),
          info: expect.any(Object),
          paths: expect.any(Object),
          schemes: expect.any(Array),
          swagger: "2.0",
          tags: expect.any(Array),
        });
      });
    });
  });
});
