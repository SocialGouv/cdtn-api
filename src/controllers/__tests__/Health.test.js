import answerWithError from "../../helpers/answerWithError";
import Health from "../Health";

jest.mock("../../helpers/answerWithError");

describe(`controllers/Health`, () => {
  const koaContextMock = {
    params: {},
    query: {},
  };

  beforeEach(() => {
    answerWithError.mockReset();
  });

  describe(`#get()`, () => {
    describe(`should fill body with the expected data`, () => {
      it(`with a code ID`, () => {
        const ctx = {
          ...koaContextMock,
        };

        Health.get(ctx);

        expect(answerWithError).not.toHaveBeenCalled();
        expect(ctx.body).toMatchObject({
          success: true,
        });
      });
    });
  });
});
