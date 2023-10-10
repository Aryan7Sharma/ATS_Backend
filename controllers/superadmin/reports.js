const { env } = process;
const logger = require('../../config/app_logger');

const customReport1 = async (req, res) => {
    try {

    } catch (error) {
        logger.error(`server error inside customReport1 Report controller${error}`);
    }
}
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
    customReport1,
    customReport2,
    customReport3,
    customReport4,
    customReport5
}