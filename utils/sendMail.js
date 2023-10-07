const nodemailer = require('nodemailer');

//Create a nodemailer transporter with your Gmail account
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'fcreation.tech@gmail.com',
        pass: 'cztyfotvdzodsbot',
    },
});

const emailMessageBody = (type, ...paras) => {
    const values = paras;
    const messages = {
        newPassword: `Hello,
We received a request to reset your password because you forgot your current password. We're here to help!
    
Your new password is: [${values[0]}]
        
Please use this new password to log in to your account. We recommend changing this password to something memorable and secure once you log in.
        
If you did not request this password reset, please ignore this email or contact our admin immediately.
     

Thank you for using our services.
            
Best regards,
MV Services Pvt Ltd.
Phone No -- 8923136015`
}
    return messages[type]
}

const sendNewPassword = async (email, newPassword) => {
    const message = emailMessageBody('newPassword', newPassword);
    return new Promise((resolve, reject) => {
        // Compose the email message
        const mailOptions = {
            from: 'fcreation.tech@gmail.com',
            to: email,
            subject: "Your New Password",
            text: `${message}`
        };
        // Send the email using the nodemailer transporter
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({ "status": "failed" }); // reject the promise with a failed status
            } else {
                resolve({ "status": "successfull" }); // Resolve the promise with a successful status
            }
        });
    });
}

module.exports = {
    sendNewPassword
};
