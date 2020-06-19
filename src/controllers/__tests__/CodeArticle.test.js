import CodeArticle from "../CodeArticle";

describe(`controllers/CodeArticle`, () => {
  const koaContextMock = {
    throw: jest.fn(),
  };

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with a code article CID`, () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrcid: "LEGIARTI000006901112",
          },
        };

        CodeArticle.get(ctx);

        expect(ctx.throw).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          data: {
            cid: "LEGIARTI000006901112",
            id: expect.any(String),
          },
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
          id: expect.any(String),
          num: "L1234-1",
        });
      });
    });
  });
});
