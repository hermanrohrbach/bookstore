This is a setup for a RESTful API for an online bookstore.
Before running, please install the necessary packages:

npm install express sequelize sqlite3 bcrypt jsonwebtoken
npm install --save-dev typescript ts-node sequelize-typescript globals @types/express @types/node @types/bcrypt @types/jsonwebtoken

The file books.json to populate the database was generated using ChatGpt, with the following prompt:

"Can you please compile a JSON file with 100 famous books about veganism, environmentalism, plant-based food and similar topics, using a schema like

{
  "title": "Eating Animals","

