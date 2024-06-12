                          Bike Rental  System Backend | 2024

Technology Stack:
- Programming Language: TypeScript
- Web Framework: Express.js
- ODM & Validation Library: Zod, Mongoose for MongoDB

# Bike Rental System Backend
 I have created a Bike Rental System Backend using express.js and mongoes. The backend is hosted on vercel. The api is secured using JWT. The api routes require a token to access the data. there are two types of users: Admin and User. The admin has access to all the routes while the user has access to only the routes that are only available to users.
 Without the token, the user will not be able to access the data and receive a 401 error and with an invalid token, the user will receive a 403 error.  For those who are not admins but try to access the admin routes, they will receive a 403 error that they are not authorized to access the data. 
  The api has the following endpoints:
 
The api has the following endpoints:
API Endpoints:
- /api/bikes
- /api/users
- /api/rentals

The backend is hosted on vercel. URL : [Bike Rental Backend ](https://bike-rental-backend-delta.vercel.app)

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


