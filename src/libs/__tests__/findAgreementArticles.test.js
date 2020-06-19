import findAgreementArticles from "../findAgreementArticles";

describe("libs/findAgreementArticles()", () => {
  describe("should return the expected first article", () => {
    it(`with <agreementIdOrIdcc>="KALICONT000005635091", <query>="5.14"`, () => {
      const received = findAgreementArticles("KALICONT000005635091", "5.14");

      expect(received[0].cid).toBe("KALIARTI000005782386");
      expect(received[0].num).toBe("5.14");
    });
  });
});
