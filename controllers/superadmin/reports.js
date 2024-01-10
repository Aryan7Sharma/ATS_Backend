const { env } = process;
const logger = require('../../config/app_logger');
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/db_connection');
const { getEmployeeAttendanceReport1Func } = require("../../models/custom_functions");

const getEmployeeAttendanceReport1 = async (req, res) => {
    try {
        const { emp_id, start_date, end_date } = req.body;
        const attendata = await getEmployeeAttendanceReport1Func(emp_id, start_date, end_date);
        if (!attendata) { return res.status(404).send({ status: env.s404, msg: "Employee Attendance Data Not Found", data: [] }); };
        return res.status(200).send({ status: env.s200, msg: "Employee Attendance Data Fetched Successfully", data: attendata });
    } catch (error) {
        logger.error(`server error inside getEmployeeAttendanceReport1 Report controller${error}`);
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error" });
    }
};

const getEmployeesConsolidatedAttendanceReport = async (req, res) => {
    try {
        const { start_date, end_date } = req.body;
        const query = `SELECT * FROM get_employees_consolidated_attendance_report(:start_date, :end_date);`;
        const getEmployeesAttendanceData = await sequelize().query(query, {
            replacements: {
                start_date: start_date,
                end_date: end_date,
            },
            type: Sequelize.QueryTypes.SELECT,
        });
        if (!getEmployeesAttendanceData) { return res.status(404).send({ status: env.s404, msg: "Employee Attendance Data Not Found", data: [] }); }
        return res.status(200).send({ status: env.s200, msg: "Employee Attendance Data Fetched Successfully", data: getEmployeesAttendanceData });
    } catch (error) {
        logger.error(`server error inside getEmployeeAttendanceReport1 Report controller${error}`);
        return res.status(500).send({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const customReport2 = async (req, res) => {
    try {

    } catch (error) {
        logger.error(`server error inside customReport2 Report controller${error}`);
    }
}
const customReport3 = async (req, res) => {
    try {

    } catch (error) {
        logger.error(`server error inside customReport3 Report controller${error}`);
    }
}
const customReport4 = async (req, res) => {
    try {

    } catch (error) {
        logger.error(`server error inside customReport4 Report controller${error}`);
    }
}
const customReport5 = async (req, res) => {
    try {

    } catch (error) {
        logger.error(`server error inside customReport5 Report controller${error}`);
    }
}
module.exports = {
    getEmployeeAttendanceReport1,
    getEmployeesConsolidatedAttendanceReport,
    customReport2,
    customReport3,
    customReport4,
    customReport5
}