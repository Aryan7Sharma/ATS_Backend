const express = require('express');
const router = express.Router();
// import middlewares

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

router.get('/forgetpassword',
    publicmainController.forgetPassword
);
module.exports = router;