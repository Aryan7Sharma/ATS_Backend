const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
// import middlewares
const validateBody = require("../middlewares/express_validator/validateBody");

// import controller
const publicmainController = require("../controllers/public/index");

// routes
router.post('/punchIn',
    [
        check('site_location_id').exists().isNumeric().withMessage('Invalid site_location_id'),
        check('location_distance_bykm').exists().isNumeric().withMessage('Invalid location_distance_bykm'),
    ], validateBody, publicmainController.checkIn
);
router.post('/punchOut',
    [   
        check('attendance_id').exists().isNumeric().withMessage('Invalid Attendance ID.'),
        check('site_location_id').exists().isNumeric().withMessage('Invalid site_location_id'),
        check('location_distance_bykm').exists().isNumeric().withMessage('Invalid location_distance_bykm'),
    ], validateBody,
    publicmainController.checkOut
);
router.get('/emplasttenAttendanceRecord',
    publicmainController.getEmpLastTenAttendanceRecord
);

router.get('/forgetpassword',publicmainController.forgetPassword);
router.get("/getallsites",publicmainController.getAllSite);
router.post("/markabsence",publicmainController.markAbsence);
module.exports = router;