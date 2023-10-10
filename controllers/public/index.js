const { env } = process;
const { check } = require('express-validator');
const logger = require('../../config/app_logger');
// import models
const { employeesModel, employeesattendanceModel, empLeavesModel, empAttenSummaryModel } = require('../../models/index');
// import common func
const { generateNewPassword, hashPassword } = require("../../utils/index");
const { sendNewPassword } = require("../../utils/sendMail");

const checkIn = async (req, res) => {
    try {
        const { site_location_id, location_distance_bykm } = req.body;
        const user_login = req.user;
        const employee = await employeesModel.findOne({ where: { emp_emailid: user_login?.user_id } })
        if (!employee || employee?.emp_status !== 1) { return res.status(404).json({ status: env.s404, msg: 'Employee Not Found or Its Blocked by Adminstraction!' }) };
        const remark = location_distance_bykm > 1 ? 'PunchIn Distance is Greater Than 1Km.' : 'PunchIn Distance is Less Than 1Km.';
        empAttendanceData = {
            atten_date: new Date(),
            check_in_site_location_id: site_location_id,
            emp_id: employee.emp_id,
            check_in: new Date(),
            check_in_loc_dis_inkm: parseInt(location_distance_bykm),
            remark: remark
        }
        const checkInData = await employeesattendanceModel.create(empAttendanceData);
        if (!checkInData) { return res.status(424).json({ status: env.s424, msg: 'PunchIn Failed!, try again' }) };
        const empAttenSummary = await empAttenSummaryModel.findOne({
            where: {
                atten_date: new Date(),
                emp_id: employee.emp_id,
            }
        })
        if (!empAttenSummary) {
            const date = new Date();
            const empAttenSummaryData = {
                atten_date: date,
                emp_id: employee.emp_id,
                first_check_in: date
            }
            await empAttenSummaryModel.create(empAttenSummaryData);
        } else {
            // empAttenSummary.total_working_minutes=1;
            // empAttenSummary.total_minutes_on_site=1;
            // await empAttenSummary.save();
        }
        console.log('below');
        const respData = { attendanceId: checkInData.attendance_id, site_location_id: checkInData.site_location_id, punchInDateTime: checkInData.check_in }
        return res.status(200).send({ status: env.s200, msg: "You PunchIn Successfully!", data: respData });
    } catch (error) {
        console.log("err", error);
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error" });
    }
};

const checkOut = async (req, res) => {
    try {
        const { site_location_id, location_distance_bykm, attendance_id } = req.body;
        const user_login = req.user;
        const empAttendanceData = await employeesattendanceModel.findByPk(attendance_id);
        if (!empAttendanceData) { return res.status(404).json({ status: env.s404, msg: 'Your PunchIn Details Does Not Exist!' }) };
        const employee = await employeesModel.findOne({ where: { emp_emailid: user_login?.user_id } })
        if (!employee || employee?.emp_status !== 1) { return res.status(404).json({ status: env.s404, msg: 'Employee Not Found or Its Blocked by Adminstraction!' }) };
        let remark = '';
        if (empAttendanceData.site_location_id !== site_location_id) { remark = `Red Flag Employee PuchIn From Location ID ${empAttendanceData.site_location_id}  and PunchOut From Location ID ${site_location_id} both are Different.` }
        else { remark = `${empAttendanceData.remark} and Punch Out Distance is ${location_distance_bykm}.` }
        empAttendanceData.check_out = new Date();
        empAttendanceData.check_out_location_distance_bykm = parseInt(location_distance_bykm);
        empAttendanceData.remark = remark;
        await empAttendanceData.save();
        return res.status(200).send({ status: env.s200, msg: "You PunchOut Successfully!", data: {} });
    } catch (error) {
        console.log("error-->", error)
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error" });
    }
};

const markLeave = async (req, res) => {
    try {
        const { site_location_id, location_distance_bykm, attendance_id } = req.body;
        const user_login = req.user;
        const empAttendanceData = await employeesattendanceModel.findByPk(attendance_id);
        if (!empAttendanceData) { return res.status(404).json({ status: env.s404, msg: 'Your PunchIn Details Does Not Exist!' }) };
        const employee = await employeesModel.findOne({ where: { emp_emailid: user_login?.user_id } })
        if (!employee || employee?.emp_status !== 1) { return res.status(404).json({ status: env.s404, msg: 'Employee Not Found or Its Blocked by Adminstraction!' }) };
        let remark = '';
        if (empAttendanceData.site_location_id !== site_location_id) { remark = `Red Flag Employee PuchIn From Location ID ${empAttendanceData.site_location_id}  and PunchOut From Location ID ${site_location_id} both are Different.` }
        else { remark = `${empAttendanceData.remark} and Punch Out Distance is ${location_distance_bykm}.` }
        empAttendanceData.check_out = new Date();
        empAttendanceData.check_out_location_distance_bykm = parseInt(location_distance_bykm);
        empAttendanceData.remark = remark;
        await empAttendanceData.save();
        return res.status(200).send({ status: env.s200, msg: "You PunchOut Successfully!", data: {} });
    } catch (error) {
        console.log("error-->", error)
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error" });
    }
};

const getEmpLastTenAttendanceRecord = async (req, res) => {
    try {
        console.log("start")
        const user_login = req.user;
        const employee = await employeesModel.findOne({ where: { emp_emailid: user_login?.user_id } })
        if (!employee || employee?.emp_status !== 1) { return res.status(404).json({ status: env.s404, msg: 'Employee Not Found or Its Blocked by Adminstraction!' }) };
        const empAttendancesData = await employeesattendanceModel.findAll({
            where: { emp_id: employee?.emp_id },
            order: [['attendance_id', 'DESC']],
            limit: 10,
        });
        if (!empAttendancesData) { return res.status(404).json({ status: env.s404, msg: 'Employees Attendance Record Not Found!' }) };
        console.log("send it");
        return res.status(200).send({ status: env.s200, msg: "Employees Attendance Found Successfully!", data: empAttendancesData });
    } catch (error) {
        console.log("error-->", error)
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error" });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const user_login = req.user;
        const newPassword = generateNewPassword();
        const hash_password = await hashPassword(newPassword); // convert plain password into hashpassword
        // Update the user's hashed password in the database
        const sendOtpResponce = await sendNewPassword(user_login.user_id, newPassword);
        if (!sendOtpResponce || sendOtpResponce.status !== "successfull") { res.status(417).json({ status: env.s417, msg: "Failed to Send New Password Over Mail Contact your Admin!" }); };
        user_login.hash_password = hash_password;
        await user_login.save();
        // sending final responce;
        res.status(200).json({ status: env.s200, msg: "New Passord Send into Your Registered Mail ID." });
    } catch (error) {
        console.log("error-->", error);
        res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const getAllSite = async (req, res) => {
    try {
        const allSites = await siteslocationModel.findAll();
        return res.status(200).send({ status: env.s200, msg: "All Sites Fetched Successfully", data: allSites });
    } catch (error) {
        logger.error(`server error inside getAllSite controller${error}`);
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error" });
    }
}
const markAbsence = async (req, res) => {
    try {
        const { leave_reason } = req.body;
        const user = req.user;
        const emp = await employeesModel.findOne({ where: { emp_emailid: user.user_id } });
        console.log("emp", emp);
        if (!emp) { return res.status(404).json({ status: env.s404, msg: 'Employee Record Not Found!' }) };
        const leaveData = {
            emp_id: emp.emp_emailid,
            leave_date: new Date(),
            leave_reason: leave_reason || 'NA'
        }
        console.log("check", leaveData);
        await empLeavesModel.create(leaveData);
        console.log("done");
        return res.status(200).send({ status: env.s200, msg: "Leave Marked Successfully", data: { 'status': 'done' } });
    } catch (error) {
        console.log(error)
        logger.error(`server error inside markAbsence controller${error}`);
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error" });
    }
}
module.exports = {
    checkIn,
    checkOut,
    getEmpLastTenAttendanceRecord,
    forgetPassword,
    getAllSite,
    markAbsence
}
