const nodeMailer = require("nodemailer");
require("dotenv").config()


module.exports = async (email, uniqueString) => {
    try {
        const transport = nodeMailer.createTransport({
            host: process.env.HOST,
            service: 'mail',
            protocol: 'mail',
            pool: false,
            debug: true,
            logger: true,
            port: 465,
            secure: true,
            transportMethod: 'SMTP',
            requireTLS: true,
            secureConnection: true,
            auth: {
                user: process.env.USERMAIL,
                pass: process.env.PASS,
            },
            tls: {
                secure: true,
                ignoreTLS: true,
                rejectUnauthorized: true
            }
        })

        let mailOptions
        let sender = "Playgrounds Near"
        mailOptions = {
            // from: 'Playgrounds Near, <noreply@Playgrounds.app>',
            from: 'Playgrounds Near, <info@mikelcabezas.com>',
            to: email,
            subject: 'Reset Password - Playgrounds App',
            html: `<!DOCTYPE html>
            <html lang="en" style="height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body style="display: flex; flex-direction:column; justify-content: center; align-items: center; background: #DAECB5 url(https://playgroundsnear.app/assets/bg-login.png); background-size: cover; min-height: 600px; height: 100vh;">
                <div class="container" style="background: #fff;display: flex;flex-direction: column;padding: 30px;border-radius: 25px; text-align: center;max-width: 500px;width: 100%;">
                    <img src="https://playgroundsnear.app/assets/logo.png" style="margin: auto; width: 250px; height: auto">
                    <h1 style="text-align:center; font-size: 21px; font-weight: bold">Reset password</h1>
                    Hi! If you cannot request to set your password again, please ignore this email.<br>
                    For reset your password, please follow this link:
                    <p><a href="http://localhost:6543/user/recoverPassword/${uniqueString}"> http://localhost:6543/user/recoverPassword/${uniqueString}</a></p>
                </div>
            </body>
            </html> `
            // html: `Press <a href="${process.env.API_URL}/validate/${uniqueString}"> here </a> to verify your account`
        }
        console.log(uniqueString)

        transport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error.message)
            } else console.log('Mail sent!')
        })
    } catch (error) {
        console.log(error.message)
        console.log('Mail notsent!')
    }
}