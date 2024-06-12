                          Bike Rental  System Backend | 2024

Technology Stack:
- Programming Language: TypeScript
- Web Framework: Express.js
- ODM & Validation Library: Zod, Mongoose for MongoDB

# Bike Rental System Backend
 I have created a Bike Rental System Backend using express.js and mongoes and typescript. The backend is hosted on vercel. The api is secured using JWT. The api routes require a token to access the data. there are two types of users: Admin and User. The admin has access to all the routes while the user has access to only the routes that are only available to users.
 Without the token, the user will not be able to access the data and receive a 401 error and with an invalid token, the user will receive a 403 error.  For those who are not admins but try to access the admin routes, they will receive a 403 error that they are not authorized to access the data. 
  The api has the following endpoints:
 
The api has the following endpoints:
API Endpoints:
- /api/bikes
- /api/users
- /api/rentals

The backend is hosted on vercel. URL : [Bike Rental Backend ](https://bike-rental-backend-delta.vercel.app)

 more deatils on route are 
 ## Deatils on routes
```json
 
  {
  "routes": {
    "User Routes": {
      "Sign Up": {
        "method": "POST",
        "route": "/api/auth/signup"
      },
      "Login": {
        "method": "POST",
        "route": "/api/auth/login"
      },
      "Get Profile": {
        "method": "GET",
        "route": "/api/users/me"
      },
      "Update Profile": {
        "method": "PUT",
        "route": "/api/users/me"
      }
    },
    "Bike Routes": {
      "Create Bike": {
        "method": "POST",
        "route": "/api/bikes"
      },
      "Get All Bikes": {
        "method": "GET",
        "route": "/api/bikes"
      },
      "Update Bike": {
        "method": "PUT",
        "route": "/api/bikes/:id"
      },
      "Delete Bike": {
        "method": "DELETE",
        "route": "/api/bikes/:id"
      }
    },
    "Rental Routes": {
      "Create Rental": {
        "method": "POST",
        "route": "/api/rentals"
      },
      "Return Bike": {
        "method": "PUT",
        "route": "/api/rentals/:id/return"
      },
      "Get All Rentals for User": {
        "method": "GET",
        "route": "/api/rentals"
      }
    }
  }
}


```

To test the api here is the admin credentials:
```json
{
  "email": "john@example.com",
  "password": "password123"
}

```
To test the api here is the user credentials:
```json

{
"email": "Normal@example.com",
"password": "password123"
}
    
```
## file structure in modules
```bash
modules
├── bikes
│   ├── bike.controller.ts
│   ├── bike.model.ts
│   ├── bike.routes.ts
│   └── bike.valdation.ts
│   └── bike.services.ts
├── rentals
│   ├── rental.controller.ts
│   ├── rental.model.ts
│   ├── rental.routes.ts
│   └── rental.valdation.ts
│   └── rental.services.ts
├── users
│   ├── user.controller.ts
│   ├── user.model.ts
│   ├── user.routes.ts
│   └── user.valdation.ts
│   └── user.services.ts
```







## Error Handling

The API has a centralized error handling middleware that catches all errors and sends the error response in the following format:
    
    ```json
    {
    "status": "error",
    "message": "error message"
    }
    ```
Error like zod validation error, mongoose validation error, and other errors are handled in the error handling middleware.
All erors are handel in global error handler middleware.


```json
{
  "status": "error",
  "message": "error message"
}
```


How to run the project:
- Clone the repository
- Run npm install
- Run npm start
- The server will start at port 5000
- Use Postman to test the API endpoints

Roles
- Admin
- User












- Happy Coding! 🚀
```


