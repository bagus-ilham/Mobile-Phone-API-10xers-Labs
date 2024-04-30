const app = require("..");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

describe("User Registration", () => {
  beforeEach(async () => {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  test("should register a new user", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      phoneNumber: "1234567890",
    };

    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username", userData.username);
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("phoneNumber", userData.phoneNumber);
    expect(response.body).not.toHaveProperty("password");
  });

  test("should return 400 if username is missing", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
      phoneNumber: "1234567890",
    };

    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "Username, email, password or phone number required");
  });

  test("should return 400 if email is missing", async () => {
    const userData = {
      username: "testuser",
      password: "password123",
      phoneNumber: "1234567890",
    };

    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "Username, email, password or phone number required");
  });

  test("should return 400 if password is missing", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      phoneNumber: "1234567890",
    };

    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "Username, email, password or phone number required");
  });

  test("should return 400 if phoneNumber is missing", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "Username, email, password or phone number required");
  });

  test("should return 400 if email is already registered", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      phoneNumber: "1234567890",
    };

    await request(app)
      .post("/user/register")
      .send(userData);

    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "Email already registered");
  });
});