import answerWithError from "../../helpers/answerWithError";
import Agreement from "../Agreement";

jest.mock("../../helpers/answerWithError");

describe(`controllers/Agreement`, () => {
  const koaContextMock = {
    params: {},
    query: {},
  };

  beforeEach(() => {
    answerWithError.mockReset();
  });

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with an agreement ID`, async () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrIdcc: "KALICONT000005635091",
          },
        };

        await Agreement.get(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          data: {
            id: "KALICONT000005635091",
            num: 2190,
          },
        });
      });

      it(`with an agreement IDCC`, async () => {
        const ctx = {
          ...koaContextMock,
          params: {
            idOrIdcc: "2190",
          },
        };

        await Agreement.get(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
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

        expect(answerWithError).not.toHaveBeenCalled();
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

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body).toHaveLength(1);
        expect(ctx.body[0]).toMatchObject({
          id: "KALICONT000005635444",
          num: 1480,
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

        Agreement.index(ctx);

        expect(answerWithError).toHaveBeenCalledTimes(1);
      });
    });
  });
});
