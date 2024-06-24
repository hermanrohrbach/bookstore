# bookstore
 This is a prototype of a RESTful API for a bookstore. It uses TypeScript, JSON Web Tokens for authentication, bcrypt for password hashing, and Sequelize for the database connection and schema. The current configuration creates a SQLite database, but this is easily changed using the Sequelize setup.

 ## installation
1. `npm install express sequelize sqlite3 bcrypt jsonwebtoken`
2. `typescript ts-node sequelize-typescript @types/express @types/node @types/bcrypt @types/jsonwebtoken`
3. You're good to go! Simply run `npm start`

## postman
It is nice to test this API using Postman, as it does not have a FrontEnd yet.
