
const request = require("supertest");
const { sequelize, Product, User } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers");
const app = require("..");

describe("Product Routes", () => {
  let accessToken;
  let user;
  let products;

  beforeAll(async () => {
    user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    accessToken = signToken({ id: user.id, username: user.username });

    products = await Product.bulkCreate([
      {
        name: "Product 1",
        description: "Description 1",
        price: 10.99,
        stock: 5,
        image: "image1.jpg",
        UserId: user.id,
      },
      {
        name: "Product 2",
        description: "Description 2",
        price: 20.99,
        stock: 10,
        image: "image2.jpg",
        UserId: user.id,
      },
    ]);
  });

  afterAll(async () => {
    await User.destroy({ truncate: true, cascade: true });
    await Product.destroy({ truncate: true, cascade: true });
  });

  describe("GET /products", () => {
    test("should return all products", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty("name", "Product 1");
      expect(response.body[1]).toHaveProperty("name", "Product 2");
    });
  });

  describe("GET /products/:id", () => {
    test("should return a product by ID", async () => {
      const response = await request(app).get(`/products/${products[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Product 1");
    });

    test("should return 404 if product not found", async () => {
      const response = await request(app).get("/products/999");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("name", "Data not found");
    });
  });

  describe("POST /products", () => {
    test("should create a new product", async () => {
      const productData = {
        name: "New Product",
        description: "New Description",
        price: 30.99,
        stock: 15,
        image: "new-image.jpg",
      };

      const response = await request(app)
        .post("/products")
        .send(productData)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("regiteredProduct.name", productData.name);
      expect(response.body).toHaveProperty("msg", "Product created successfully");
    });

    test("should return 400 if required fields are missing", async () => {
      const productData = {
        description: "Incomplete Product",
        price: 10.99,
      };

      const response = await request(app)
        .post("/products")
        .send(productData)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("name", "All field canot be empty");
    });
  });

  describe("PUT /products/:id", () => {
    test("should update a product", async () => {
      const updatedData = {
        name: "Updated Product",
        description: "Updated Description",
        price: 40.99,
        stock: 20,
      };

      const response = await request(app)
        .put(`/products/${products[0].id}`)
        .send(updatedData)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("updatedProduct.name", updatedData.name);
      expect(response.body).toHaveProperty("msg", "Product Updated successfully");
    });
  });

  describe("DELETE /products/:id", () => {
    test("should delete a product", async () => {
      const response = await request(app)
        .delete(`/products/${products[0].id}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("msg", "Product deleted successfully");
    });
  });

  describe("PATCH /products/:id", () => {
    test("should upload a file", async () => {
      const response = await request(app)
        .patch(`/products/${products[1].id}`)
        .attach("file", "path/to/test-image.jpg")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", `image ${products[1].name} success to update`);
    });

    test("should return 400 if file is empty", async () => {
      const response = await request(app)
        .patch(`/products/${products[1].id}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("name", "file empty");
    });
  });
});