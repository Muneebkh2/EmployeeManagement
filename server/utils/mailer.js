// Imports Files...
const nodemailer = require('nodemailer');

module.exports = {
    send: function (email, subject, body) {

        let transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use TLS
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
        // var transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_SERVICE,
        //     port: process.env.PORT,
        //     secure: process.env.MAIL_ENCRYPTION_SSL, // use SSL
        //     auth: {
        //         user: process.env.MAIL_USERNAME,
        //         pass: process.env.MAIL_PASSWORD
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        var mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: subject,
            text: body
        };

        console.log(mailOptions);

        // res.setHeader('Content-Type', 'text/plain');

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error From NODE_MAILER:  " + error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        });
    }
}