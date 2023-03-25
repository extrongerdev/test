import app from "./app.js";
import "./database.js"

async function main() {
    app.listen(app.get("port"));
    console.log("Server on port", app.get("port"));
    console.log("Environment:", process.env.NODE_ENV);
}

main();

// 1. npm init
// 2. npm i express mongoose nodemon dotenv
// 3. crate routes and schemas folder
// 4. create three schemas
