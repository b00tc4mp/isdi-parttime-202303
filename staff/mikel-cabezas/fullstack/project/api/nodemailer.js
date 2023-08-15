const nodeMailer = require("nodemailer");

nodeMailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
        host: 'mail.playgroundsnear.app',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'noreply@playgroundsnear.app', // generated ethereal user
            pass: 'NCV4Sf8C6hrP'  // generated ethereal password
        }
    });
});