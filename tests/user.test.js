require("dotenv").config();
const request = require("supertest");
const { mongoose } = require("mongoose");
const User = require("../models/userModel");
const app = require("../server");

describe("User API", () => {
  let token;

  // beforeAll(async () => {
  //   token = jwt.sign({ _id: "testUserId" }, process.env.JWT_SECRET);
  // });

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 10000);

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/worko/user")
      // .set("Authorization", token)
      .send({
        email: "test1@gmail.com",
        name: "Test User",
        age: 30,
        city: "Test City",
        zipCode: "12345",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  }, 10000);

  it("should get all users", async () => {
    const userCreationResponse = await request(app)
      .post("/api/worko/user")
      .send({
        email: "test1@gmail.com",
        name: "Test User",
        age: 30,
        city: "Test City",
        zipCode: "12345",
      });

    expect(userCreationResponse.statusCode).toEqual(201);
    token = userCreationResponse.body.token;

    const res = await request(app)
      .get("/api/worko/user")
      .set("Authorization", `${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  }, 10000);

  it("should get user by ID", async () => {
    const userRes = await request(app).post("/api/worko/user").send({
      email: "test1@gmail.com",
      name: "Test User",
      age: 30,
      city: "Test City",
      zipCode: "12345",
    });

    const userId = userRes.body.user.id;

    const res = await request(app)
      .get(`/api/worko/user/${userId}`)
      .set("Authorization", `${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "test1@gmail.com");
  }, 10000);

  it("should update a user", async () => {
    const userRes = await request(app).post("/api/worko/user").send({
      email: "test1@gmail.com",
      name: "Test User",
      age: 30,
      city: "Test City",
      zipCode: "12345",
    });

    const userId = userRes.body.user.id;

    const updateRes = await request(app)
      .patch(`/api/worko/user/${userId}`)
      .set("Authorization", `${token}`)
      .send({
        email: "test1@gmail.com",
        name: "Updated User",
        age: 35,
        city: "Updated City",
        zipCode: "54321",
      });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toHaveProperty("email", "test1@gmail.com");
  }, 1000);

  it("should soft delete a user", async () => {
    const userRes = await request(app).post("/api/worko/user").send({
      email: "test@example.com",
      name: "Test User",
      age: 30,
      city: "Test City",
      zipCode: "12345",
    });

    const userId = userRes.body.user ? userRes.body.user.id : null;
    console.log(`Create new user Id: ${userId}`);

    const res = await request(app)
      .delete(`/api/worko/user/${userId}`)
      .set("Authorization", `${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully");

    const deletedUser = await User.findById(userId);
    expect(deletedUser.isDeleted).toBe(true);
  }, 10000);
});
