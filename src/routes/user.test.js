const clonServer = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../models/user.model");

describe("User", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should create an user correctly", async () => {
    const user = { email: "test1@gmail.com", password: "Jv50221" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });

  it("shouldn't creater an user when there is no email ", async () => {
    const user = { password: "1234" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /User validation failed: email: Path `email` is required./i
    );
  });

  it("shouln't create an user when the mail is incorrect", async () => {
    const user = { email: "test1", password: "1234" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /User validation failed: email: invalid email/i
    );
  });

  it("should not create user when email already exists", async () => {
    const user = { email: "test@test.com", password: "Test1234@" };
    await User.create(user);
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /User validation failed: email: Email already exist/i
    );
  });
});
