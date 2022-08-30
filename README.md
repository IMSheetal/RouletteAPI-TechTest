# Roulette-api - Technical Test
 To get started, we’ll need to set up our project.
 Take a clone of this repository
 go to the project folder and open it in IDE of your choice .I am using visual studio code.
 open terminal and give command "npm i"
 to run the server give command " npm run dev"

 Technical Specifications and step by step set up of project
# Step 1 - Create a directory and initialize npm by command npm init -y
 mkdir jwt-project
 cd jwt-project
 npm init -y
# Step 2 - Create files and directories
 mkdir model middleware config
 touch config/database.js middleware/auth.js model/user.js
 touch app.js index.js
 Step 3 - Install dependencies
 npm install mongoose express jsonwebtoken dotenv bcryptjs
 npm install nodemon -D

 For unit test
 npm i jest supertest
 npm test
 jest --collect-coverage
