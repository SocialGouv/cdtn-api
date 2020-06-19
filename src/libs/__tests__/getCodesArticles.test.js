import getCodesArticles from "../getCodesArticles";

describe("libs/getCodesArticles()", () => {
  describe("should return at least 1 article", () => {
    it(`with <codeId>="LEGITEXT000006072050"`, () => {
      const received = getCodesArticles("LEGITEXT000006072050");

      expect(received.length).toBeGreaterThanOrEqual(1);
    });
  });
});
