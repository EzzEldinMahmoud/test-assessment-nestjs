# Project description
this project is a Product management Application built with nestjs and typeORM and Postgresql database.

## Setup instructions
- first clone the repo 
- cd docker 
- create docker.env file and put these.
    ``` 
        POSTGRES_USER=admin
        POSTGRES_PASSWORD=admin
        POSTGRES_DB=nestjs
        PGADMIN_DEFAULT_EMAIL=admin@admin.com
        PGADMIN_DEFAULT_PASSWORD=admin
    ```
- then 
``` docker compose up```
- now go back and cd to backend folder and type:
 ```cd.. && cd backend && npm install```
- now you need to create .env file for backend folder and type this:
    ```
        ENIVERONMENT=DEV
        POSTGRES_HOST=localhost
        POSTGRES_PORT=5432
        POSTGRES_USER=admin
        POSTGRES_PASSWORD=admin
        POSTGRES_DB=nestjs
        PORT=5000
        JWT_SECRET=nodejstest
        JWT_EXPIRATION_TIME=10000
    ```
- now you can run the application by
    ```npm start``` 

## How to run the tests
```npm test```


## Example API usage

Here’s an example of how to use the `register` and `login` endpoints defined in your `AuthController` and `AuthService` classes. I'll provide an API usage example using an HTTP client like `Postman` or `curl`, as well as the expected request and response structure.

---

### **API Usage Example**

#### **1. Register Endpoint**

**URL:**  
`POST /auth/register`
**for admin role use "role":"1395"**
**for user role don't send role or use role "role":"5987"**
**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "testuser@example.com",
  "password": "securePassword123",
  "role":"1395"
}
```
(*Adjust `RegisterUserDTO` properties as needed based on your DTO definition.*)

**Example curl Command:**
```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "testadmin1@example.com",
  "password": "securePassword123",
	"role":"1395"
}'
```

**Expected Response:**
- If registration is successful:
  ```json
  {
    "email": "testuser@example.com",
    "username": "TestUser",
    "id": "user-id-generated-by-db"
  }
  ```
- If the email is already registered:
  ```json
  "Email already registered"
  ```

---

#### **2. Login Endpoint**

**URL:**  
`POST /auth/login`

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "testuser@example.com",
  "password": "securePassword123"
}
```
(*Adjust `LoginUserDTO` properties as needed based on your DTO definition.*)

**Example curl Command:**
```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "testuser@example.com",
  "password": "securePassword123"
}'
```

**Expected Response:**
- If login is successful:
  ```json
  "jwt-token-here"
  ```
- If credentials are invalid:
  ```json
  {
    "statusCode": 400,
    "message": "Wrong credentials provided"
  }
  ```

---

### **Key Notes**
1. **Authentication Guard:**  
   The `login` endpoint uses the `local` strategy guard (`@UseGuards(AuthGuard('local'))`). Ensure the `passport-local` strategy is configured correctly in your NestJS application to validate users.

2. **Error Handling:**  
   Both endpoints return descriptive error messages for issues like duplicate registration or invalid credentials.

3. **DTOs:**  
   Make sure `RegisterUserDTO` and `LoginUserDTO` match the request payload structure. For example:
   ```typescript
   export default class RegisterUserDTO {
       email: string;
       password: string;
       username: string;
   }

   export default class LoginUserDTO {
       email: string;
       password: string;
   }
   ```

4. **Token Handling:**  
   The `login` endpoint returns a JWT token. Include this token in subsequent requests' `access_token` headers as `<token>` for protected routes.

Based on the `ProductController` and `ProductService` you've provided, here are example API usages for each endpoint. These examples include HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and the necessary request/response structures.

---

### **API Usage Examples**

#### **1. List All Products**

**URL:**  
`GET /Products`

**Request Headers:**  
No authentication required.

**Example curl Command:**
```bash
curl -X GET http://localhost:3000/Products
```

**Expected Response:**  
```json
[
  {
    "id": "1",
    "name": "Laptop A",
    "price": 1500,
    "description": "High-performance laptop",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  },
  {
    "id": "2",
    "name": "Phone B",
    "price": 800,
    "description": "Latest smartphone",
    "createdAt": "2025-01-02T12:00:00.000Z",
    "updatedAt": "2025-01-02T12:00:00.000Z"
  }
]
```

---

#### **2. Get Product by ID**

**URL:**  
`GET /Products/:id`

**Request Headers:**  
No authentication required.

**Example curl Command:**
```bash
curl -X GET http://localhost:3000/Products/1
```

**Expected Response:**  
- If the product exists:
  ```json
  {
    "id": "1",
    "name": "Laptop A",
    "price": 1500,
    "description": "High-performance laptop",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  }
  ```
- If the product does not exist:
  ```json
  {
    "statusCode": 404,
    "message": "Not Found"
  }
  ```

---

#### **3. Create a New Product (Admin Only)**

**URL:**  
`POST /Products`

**Request Headers:**
```json
{
  "Content-Type": "application/json",
  "access_token": "<jwt-token>"
}
```

**Request Body:**  
```json
{
  "name": "New Product",
  "price": 1200,
  "description": "Description of the product"
}
```

**Example curl Command:**
```bash
curl -X POST http://localhost:3000/Products \
-H "Content-Type: application/json" \
-H "access_token": "<jwt-token>" \
-d '{
  "name": "New Product",
  "price": 1200,
  "description": "Description of the product"
}'
```

**Expected Response:**  
- On success:
  ```json
  {
    "id": "3",
    "name": "New Product",
    "price": 1200,
    "description": "Description of the product",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
  ```
- On failure:
  ```json
  {
    "statusCode": 304,
    "message": "Couldn't Create Product Due to Error."
  }
  ```

---

#### **4. Update Product Details (Admin Only)**

**URL:**  
`PUT /Products/:id`

**Request Headers:**
```json
{
  "Content-Type": "application/json",
  "access_token": "<jwt-token>"
}
```

**Request Body:**  
```json
{
  "name": "Updated Product",
  "price": 1100,
  "description": "Updated description of the product"
}
```

**Example curl Command:**
```bash
curl -X PUT http://localhost:3000/Products/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <jwt-token>" \
-d '{
  "name": "Updated Product",
  "price": 1100,
  "description": "Updated description of the product"
}'
```

**Expected Response:**  
- On success:
  ```json
  {
    "id": "1",
    "name": "Updated Product",
    "price": 1100,
    "description": "Updated description of the product",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
  ```
- If the product is not found:
  ```json
  {
    "statusCode": 404,
    "message": "Product not found"
  }
  ```

---

#### **5. Delete a Product (Admin Only)**

**URL:**  
`DELETE /Products/:id`

**Request Headers:**
```json
{
  "access_token": "<jwt-token>"
}
```

**Example curl Command:**
```bash
curl -X DELETE http://localhost:3000/Products/1 \
-H "access_token: <jwt-token>"
```

**Expected Response:**  
- If deletion is successful:
  ```json
  "Product already deleted"
  ```
- If deletion fails:
  ```json
  {
    "statusCode": 424,
    "message": "Product can't be deleted"
  }
  ```

---

### **Notes:**
1. **Admin Authorization:**  
   The `POST`, `PUT`, and `DELETE` endpoints are protected by a `JWT`-based guard (`@UseGuards(AuthGuard('jwt'))`). Ensure you have a valid token with admin privileges for these actions.

2. **Validation:**  
   Add validation for `ProductDTO` to ensure data integrity (e.g., `name` and `price` are required).

3. **Entity Definition:**  
   Ensure `ProductEntity` matches the structure of `ProductDTO` and includes fields like `id`, `name`, `price`, `description`, `createdAt`, and `updatedAt`.

4. **Error Handling:**  
   Extend error messages with more detailed information if needed for debugging.

