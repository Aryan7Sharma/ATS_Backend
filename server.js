require('dotenv').config();
const logger = require('./config/app_logger');
const connectDB = require('./config/db_connection');
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.disable('x-powered-by'); // less hackers know about our stack
//app.use(cookieParser);

// import middlewares
const {verifyUser,verifyEmployee,verifyAdmin,verifySuperAdmin} = require("./middlewares/auth/index");

// import routes
const authRoute = require("./routes/auth");
const publicRoute = require("./routes/public");
const superadminRoute = require("./routes/superadmin");
const adminRoute = require("./routes/admin");
const employeeRoute = require("./routes/employee");

app.use('/ats/api/auth',authRoute);
app.use('/ats/api/public',verifyUser, publicRoute);
app.use('/ats/api/superadmin', verifySuperAdmin, superadminRoute);
app.use('/ats/api/admin', verifyAdmin, adminRoute);
app.use('/ats/api/employee',verifyEmployee, employeeRoute);

 



app.get('/', (req, res) => {
    res.json({ msg: 'Hello from server' });
});

const port = process.env.eas1_backend_Port;
/** start server only when we have valid connection */
connectDB().authenticate().then(() => {
    try {
        app.listen(port, () => {
            logger.info(`Server connected to ${port} Port`);
        })
    } catch (error) {
        logger.error(`Cannot connect to the server causing error ${error}`)
    }
}).catch(error => {
    logger.error(`Invalid database connection...! causing error ${error}`);
})
