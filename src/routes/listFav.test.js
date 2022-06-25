const clonServer = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../models/user.model");
const ListFav = require("../models/listFav.model");
const jwt = require("jsonwebtoken");

describe("ListFavs", () => {
  let user;
  let token;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();

    const usermockup = { email: "test@test.com", password: "Test1234@" };
    user = await User.create(usermockup);
    token = jwt.sign(
      { id: user._id }, //Payload ó datos usuario
      process.env.SECRET, //llave secreta
      { expiresIn: 60 * 60 * 24 }
    );
  });

  afterAll(async () => {
    await disconnected();
  });

  it("shouldn't create a list if user isn't authenticated", async () => {
    const fav = { titleList: "titulo 1" };
    const res = await clonServer(app).post("/favs/").send(fav);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/expired session/i);
  });

  it("shouldnt create a list if token is empty", async () => {
    const fav = { titleList: "titulo 1" };
    const res = await clonServer(app)
      .post("/favs")
      .send(fav)
      .set("Authorization", "Bearer ")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Expired session/i);
  });

  it("should create a list if user is authenticated", async () => {
    const fav = { titleList: "titulo 1" };
    const res = await clonServer(app)
      .post("/favs/")
      .send(fav)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/list created/i);
  });

  it("should delete a list if user is authenticated and is owner", async () => {
    const fav = { titleList: "titulo 1" };
    const list2 = await ListFav.create({ ...fav, user });

    const res = await clonServer(app)
      .delete(`/favs/${list2._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch("list deleted succesfully");
  });

  //   it("shouldnt delete a list if user is authenticated and isnt owner", async () => {
  //     const fav = { titleList: "titulo 1" };
  //     const user2 = await User.create({
  //       email: "test3@gmail.com",
  //       password: "Test1234@",
  //     });
  //     const listFav = await ListFav.create({ ...fav, userId: user2 });

  //     const res = await clonServer(app)
  //       .delete(`/favs/${listFav._id}`)
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(res.statusCode).toBe(400);
  //     // expect(res.body.message).toMatch("list deleted succesfully");
  //   });
});
