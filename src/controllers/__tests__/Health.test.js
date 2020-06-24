import Health from "../Health";

describe(`controllers/Health`, () => {
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

        Health.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          success: true,
        });
      });
    });
  });
});
