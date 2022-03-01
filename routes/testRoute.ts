// import controller and express
import { TestController } from "../controllers/testController";
const { application } = require("../app");


// root route
application.get('*', TestController);