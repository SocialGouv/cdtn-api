jest.mock("./helpers/cache", () => ({
  get: jest.fn(() => null),
  set: jest.fn(() => undefined),
}));
