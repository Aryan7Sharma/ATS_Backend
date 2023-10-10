const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
// import middlewares
const validateBody = require("../middlewares/express_validator/validateBody");
// import controller
const superadminmainController = require("../controllers/superadmin/index");

// routes
router.get("/getallsites",superadminmainController.getAllSite);
router.get("/getallemployees",superadminmainController.getAllEmp);
router.post("/updateemp",
[
    
],validateBody,superadminmainController.updateEmployee);


module.exports = router;