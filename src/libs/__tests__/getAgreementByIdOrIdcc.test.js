import getAgreementByIdOrIdcc from "../getAgreementByIdOrIdcc";

describe("libs/getAgreementByIdOrIdcc()", () => {
  describe("should return the expected agreement unist tree", () => {
    it(`with <agreementIdOrIdcc>="KALICONT000038661444"`, () => {
      const received = getAgreementByIdOrIdcc("KALICONT000038661444", "5.14");

      expect(received).toMatchObject({
        data: {
          id: "KALICONT000038661444",
          num: 3230,
        },
      });
    });
  });
});
