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

  describe(`#post()`, () => {
    it(`should set "isCached" cache key`, () => {
      const ctx = {
        ...koaContextMock,
      };

      Ready.post(ctx);

      expect(ctx.throw).not.toHaveBeenCalled();
      expect(ctx.statusCode).toBe(201);

      Ready.get(ctx);

      expect(ctx.throw).not.toHaveBeenCalled();
      expect(ctx.statusCode).toBe(200);
      expect(ctx.body).toMatchObject({});
    });
  });
});
