import getAgreementsArticles from "../getAgreementsArticles";

describe("libs/getAgreementsArticles()", () => {
  describe("should return the expected object", () => {
    it(`with <agreementIdOrIdcc>="KALICONT000005635085"`, async () => {
      const received = await getAgreementsArticles("KALICONT000005635085");

      expect(received[0]).toMatchObject({
        cid: expect.any(String),
        containerId: expect.any(String),
        content: expect.any(String),
        id: expect.any(String),
        index: expect.any(String),
        path: expect.any(String),
      });
    });
  });
});
