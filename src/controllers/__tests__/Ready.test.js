import Ready from "../Ready";

describe(`controllers/Ready`, () => {
  const koaContextMock = {
    params: {},
    query: {},
    throw: jest.fn(),
  };

  beforeEach(() => {
    koaContextMock.throw.mockReset();
  });

  describe(`#get()`, () => {
    it(`should throw a 404`, () => {
      const ctx = {
        ...koaContextMock,
      };

      Ready.get(ctx);

      expect(ctx.throw).toHaveBeenCalledWith(404);
    });
  });
});
