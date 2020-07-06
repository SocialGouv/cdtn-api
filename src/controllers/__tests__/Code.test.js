import answerWithError from "../../helpers/answerWithError";
import Code from "../Code";

jest.mock("../../helpers/answerWithError");

describe(`controllers/Code`, () => {
  const koaContextMock = {
    params: {},
    query: {},
  };

  beforeEach(() => {
    answerWithError.mockReset();
  });

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with a code ID`, async () => {
        const ctx = {
          ...koaContextMock,
          params: {
            id: "LEGITEXT000006073189",
          },
        };

        await Code.get(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
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

        expect(answerWithError).not.toHaveBeenCalled();
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

        expect(answerWithError).not.toHaveBeenCalled();
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

        expect(answerWithError).toHaveBeenCalledTimes(1);
      });
    });
  });
});
