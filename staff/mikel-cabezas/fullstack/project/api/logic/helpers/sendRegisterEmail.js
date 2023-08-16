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
                secure: false,
                ignoreTLS: true,
                rejectUnauthorized: true
            }
        })

        let mailOptions
        let sender = "Playgrounds Near"
        mailOptions = {
            from: 'Playgrounds Near, <noreply@Playgrounds.app>',
            to: email,
            subject: 'Email confirmation - Playgrounds App',
            html: `<!DOCTYPE html>
            <html lang="en" style="min-height: 30vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body style="display: flex; justify-content: center; align-items: center; background: #DAECB5 url(https://playgroundsnear.app/assets/bg-login.png); background-size: cover; min-height: 10px; min-height: 30vh;">
                    <div class="container" style="background: #fff;display: flex;flex-direction: column;padding: 30px;border-radius: 25px; text-align: center;max-width: 500px;width: 100%;">
                        <img src="https://playgroundsnear.app/assets/logo.png" style="margin: auto; width: 250px; height: auto">
                        <h1 style="text-align:center; font-size: 21px; font-weight: bold">Thanks for register!</h1>
                        Follow this link
                        <a href="http://localhost:6543/user/validate/${uniqueString}"> http://localhost:6543/user/validate/${uniqueString}</a>
                        for verify your account.
                    </div>
                </body>
            </html> `
        }

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