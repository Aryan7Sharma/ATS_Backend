const Sequelize = require('sequelize');
const { Op } = Sequelize;
const { sendPunchOutNotifyEmail } = require('../utils/sendMail');
const { employeesattendanceModel, employeesModel } = require("../models/index");
const logger =  require('../config/app_logger');

const getEmpNotPunchedOut = async () => {
    let empData = [];
    try {
        const currentDate = new Date();
        const subquery = await employeesattendanceModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('emp_id')), 'emp_id']],
            where: {
                atten_date: {
                    [Op.eq]: '2023-11-01',
                },
                check_out: {
                    [Op.is]: null,
                },
            },
        });

        const empNotPunchOutData = await employeesModel.findAll({
            attributes: ['emp_emailid', 'emp_name'],
            where: {
                emp_id: {
                    [Op.in]: subquery.map((item) => item.emp_id),
                },
            },
        })
        empData = empNotPunchOutData.map((employee) => {
            return { emp_emailid: employee.emp_emailid, emp_name: employee.emp_name }
        });
        console.log(empData)
    } catch (err) {

    } finally {
        return empData;
    }
}


async function notifyPunchInUsers() {
    try {
        const recipients = await getEmpNotPunchedOut();
        for (const recipient of recipients) {
            sendPunchOutNotifyEmail(recipient)
                .then((value) => {
                    console.log("done", value, recipient.emp_emailid);
                })
                .catch((error) => {
                    console.log("failed", error, recipient.emp_emailid);
                });
        }
    } catch (err) {
        logger.error(`notifyPunchInUsers Cron failed at 10:00 AM, error -- ${err}`)
    }
};
async function updatePunchInUsers() {
    try {
        const recipients = await getEmpNotPunchedOut();
    } catch (err) {
        logger.error(`updatePunchInUsers Cron failed at 11:59 AM, error -- ${err}`)
    }
};

module.exports = {
    notifyPunchInUsers,
    updatePunchInUsers
};