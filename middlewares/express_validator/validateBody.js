const { validationResult } = require('express-validator');

const validateBody = async (req, res, next) => {
  //console.log(req.body);
  const errors = await validationResult(req);
  //console.log("inside validate body");
  if (!errors.isEmpty()) {
    logger.error(`Error in Req Body Validation ${errors}`);
    return res.status(422).json(errors.array());
  } else {
    next();
  }
}

module.exports = validateBody;