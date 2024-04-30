# Mobile-Phone-API-10xers-Labs
Backend Repository for 10xers tech task, for API Documentation please check API_DOC.md

## Feature :
- Login
- Register
- Get All Product
- Get Product by ID
- Add Product
- Edit Product by ID
- Delete Product by ID 
- Upload Image Product
- Unit Test

## Package :
- Express
- Sequelize
- Postgres
- JWT
- Bcrypt
- Multer
- Claudinary
- Jest
- Supertest

## Run the Project
1. npm install
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
4. npm start

## Run unit Test
1. command this line in bin/www

```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
2. npx sequelize-cli db:create --env=test
3. npx sequelize-cli db:migrate --env=test
4. npm test

Thank You