import ApiError from "../ApiError";

describe(`libs/ApiError`, () => {
  describe(`should return the expected object`, () => {
    it(`with <path>`, () => {
      const received = new ApiError("A message", 123, "a/path");

      expect(received).toMatchObject({
        code: 123,
        message: "A message",
        path: "a/path",
      });
    });

    it(`without <path>`, () => {
      const received = new ApiError("A message", 123);

      expect(received).toMatchObject({
        code: 123,
        message: "A message",
      });
      expect(received).not.toHaveProperty("path");
    });
  });
});
