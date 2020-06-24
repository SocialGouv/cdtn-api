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
    });

    describe(`should throw`, () => {
      it(`with an undefined <codeId> query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            query: "1.2",
          },
        };

        CodeArticle.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });

      it(`with a non-string <codeId> query`, () => {
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

      it(`with an undefined <query> query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            codeId: "LEGITEXT000006072050",
          },
        };

        CodeArticle.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });

      it(`with a non-string <query> query`, () => {
        const ctx = {
          ...koaContextMock,
          query: {
            codeId: "LEGITEXT000006072050",
            query: 123,
          },
        };

        CodeArticle.index(ctx);

        expect(ctx.throw).toHaveBeenCalledTimes(1);
      });
    });
  });
});
