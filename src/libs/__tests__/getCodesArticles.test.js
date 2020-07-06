import getCodesArticles from "../getCodesArticles";

describe("libs/getCodesArticles()", () => {
  describe("should return at least 1 article", () => {
    it(`with <codeId>="LEGITEXT000006072050"`, async () => {
      const received = await getCodesArticles("LEGITEXT000006072050");

      expect(received.length).toBeGreaterThanOrEqual(1);
    });
  });
});
