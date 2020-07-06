import findAgreementArticles from "../findAgreementArticles";

describe("libs/findAgreementArticles()", () => {
  describe("should return the expected first article", () => {
    it(`with <agreementIdOrIdcc>="KALICONT000005635091", <query>="5.14"`, async () => {
      const received = await findAgreementArticles("KALICONT000005635091", "5.14");

      expect(received[0]).toMatchObject({
        cid: "KALIARTI000005782386",
        containerId: "KALICONT000005635091",
        content: expect.any(String),
        id: expect.any(String),
        index: "5.14",
        path: expect.any(String),
      });
    });
  });
});
