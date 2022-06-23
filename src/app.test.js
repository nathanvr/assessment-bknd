const { connect, disconnected, cleanup } = require("./db");

describe("App", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should app", () => {
    expect(true).toBeTruthy();
  });
});
