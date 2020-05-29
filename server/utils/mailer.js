// Imports Files...
const nodemailer = require('nodemailer');

module.exports = {
    send: function (email, subject, body) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'k152123@nu.edu.pk',
                pass: 'cs495@li'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'k152123@nu.edu.pk',
            to: email,
            subject: subject,
            text: body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("masla2 " + error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        });
    }
}