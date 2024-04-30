const app = require("..");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers");
const userData = require("../data/user.json");

let accessToken;
let dummyToken;

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", userData.map((el) => ({
    ...el,
    createdAt: new Date(),
    updatedAt: new Date(),
  })), {});

  accessToken = signToken({ id: 1, username: "pulu", role: "admin" });
  dummyToken = signToken({ id: 100 });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("User Registration", () => {
  test("POST /user/register should respond with 201 when successful", async () => {
    const data = {
      username: "pulu2",
      email: "pulu2@index.co",
      password: "pulupulu",
    };

    const response = await request(app)
      .post("/user/register")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data);

    expect(response.status).toBe(201);
  });

  test("POST /user/register should respond with 400 when email is missing", async () => {
    const data = {
      username: "pulu2",
      password: "pulupulu",
    };

    const response = await request(app)
      .post("/user/register")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Email is required");
  });

  test("POST /user/register should respond with 400 when password is missing", async () => {
    const data = {
      username: "pulu2",
      email: "pulu2@index.co",
    };

    const response = await request(app)
      .post("/user/register")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Password is required");
  });

  test("POST /user/register should respond with 400 when email is already registered", async () => {
    const data = {
      username: "pulu2",
      email: userData[0].email,
      password: "pulupulu",
    };

    const response = await request(app)
      .post("/user/register")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Email already registered");
  });

  test("POST /user/register should respond with 400 when email format is invalid", async () => {
    const data = {
      username: "pulu2",
      email: "pulu2",
      password: "pulupulu",
    };

    const response = await request(app)
      .post("/user/register")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Email must be valid");
  });

  test("POST /user/register should respond with 401 when no token is provided", async () => {
    const data = {
      username: "pulu2",
      email: "pulu2@index.co",
      password: "pulupulu",
    };

    const response = await request(app)
      .post("/user/register")
      .send(data);

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid token");
  });
});