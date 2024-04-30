# Api Documentation

## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`
- `POST /product`
- `GET /product`
- `GET /product/:id`
- `PUT /product/:id`
- `DELETE /product/:id`
- `PATCH /product/:id`

&nbsp;

## 1. POST /user/register

Request :

- body

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "User {email} created successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email is not a valid email"
}
OR
{
  "message": "Email already registered"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Phone Number is required"
}

```

&nbsp;

## 2. POST /user/login

Request :

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Ok)_

```json
{
  {
	"access_token": "eyJhbZSI6InN1cGVyYWRtaW4iLCJGci5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtyb2xlIjoic3VwZXJhZOiJx6Jn4qa9hs5gIUzI1NiIsInRG1pbiIsImlhdqaxErsurS3qGCI6MTcxNDM2MzQ4Nn0.SB8TRSCDg42fJXFi1Sn"
}
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Invalid email or password"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or password required"
}
```

&nbsp;

## 3. POST /product

Request :

- headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "image": "string"
}
```

_Response (201 - Created)_

```json
{
  {
    "id": 9,
    "name": "Samsung",
    "description": "Samsung",
    "price": 50,
    "stock": 2,
    "image": "image.png",
    "UserId": 1,
    "User": {
      "id": 1,
      "username": "pulu",
      "email": "pulu@index.co"
    }
  },
  "message": "Product created successfully",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Stock is required"
}
OR
{
  "message": "Image is required"
}
OR
{
  "message": "UserId is required"
}

```

&nbsp;

## 4. GET /product

Request :

- headers

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  [
    {
      "name": "Samsung Galaxy Z Fold 4",
      "description": "The Samsung Galaxy Z Fold 4 introduces a revolutionary foldable design, featuring a flexible display that unfolds to provide a tablet-like experience. It boasts a powerful Snapdragon 9 Gen 2 processor, a versatile camera system, and enhanced multitasking capabilities.",
      "price": 1599,
      "stock": 25,
      "image": "samsung_galaxy_z_fold_4.jpg",
      "UserId": 1,
      "User": {
        "id": 1,
        "username": "pulu",
        "email": "pulu@index.co"
        }
    },
    {
      "name": "Apple iPhone 15 Pro",
      "description": "The Apple iPhone 15 Pro sets new standards for performance and innovation, powered by the groundbreaking A17 Bionic chip. It features a stunning ProMotion XDR display, a revolutionary camera system with LiDAR technology, and ultra-fast 5G connectivity.",
      "price": 1299,
      "stock": 30,
      "image": "apple_iphone_15_pro.jpg",
      "UserId": 1,
      "User": {
        "id": 1,
        "username": "pulu",
        "email": "pulu@index.co"
        }
    },..
  ]
}
```

&nbsp;

## 5. GET /product/:id

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "name": "Apple iPhone 15 Pro",
  "description": "The Apple iPhone 15 Pro sets new standards for performance and innovation, powered by the groundbreaking A17 Bionic chip. It features a stunning ProMotion XDR display, a revolutionary camera system with LiDAR technology, and ultra-fast 5G connectivity.",
  "price": 1299,
  "stock": 30,
  "image": "apple_iphone_15_pro.jpg",
  "UserId": 1,
  "User": {
    "id": 1,
    "username": "pulu",
    "email": "pulu@index.co"
  }
}
```

&nbsp;

## 6. PUT /product/:id

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

- body

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "image": "string"
}
```

_Response (200 - Ok)_

```json
{
  "name": "Apple iPhone 15 Pro",
  "description": "The Apple iPhone 15 Pro sets new standards for performance and innovation, powered by the groundbreaking A17 Bionic chip. It features a stunning ProMotion XDR display, a revolutionary camera system with LiDAR technology, and ultra-fast 5G connectivity.",
  "price": 1299,
  "stock": 15,
  "image": "apple_iphone_15_pro.jpg",
  "UserId": 1,
  "User": {
    "id": 1,
    "username": "pulu",
    "email": "pulu@index.co"
  },
  "msg": "Product Updated successfully"
}
```

&nbsp;

## 7. DELETE /product/:id

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "name": "Apple iPhone 15 Pro",
  "description": "The Apple iPhone 15 Pro sets new standards for performance and innovation, powered by the groundbreaking A17 Bionic chip. It features a stunning ProMotion XDR display, a revolutionary camera system with LiDAR technology, and ultra-fast 5G connectivity.",
  "price": 1299,
  "stock": 15,
  "image": "apple_iphone_15_pro.jpg",
  "UserId": 1,
  "User": {
    "id": 1,
    "username": "pulu",
    "email": "pulu@index.co"
  },
  "msg": "Product deleted successfully"
}
```

&nbsp;

## 8. PATCH /product/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- file :

```json
{
  "file": "image"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "image {name} success to update"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "file Empty"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Unauthorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
