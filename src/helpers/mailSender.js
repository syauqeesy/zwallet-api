const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const controller = new Controller()

const mailSender = (to, activationToken, userId) => {
  return new Promise((resolve, reject) => {
    const transporter = controller.modules.nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: controller.MAIL_USER,
        pass: controller.MAIL_PASSWORD
      }
    })
    transporter.sendMail({
      from: controller.MAIL_USER,
      to: to,
      subject: 'Activate your Zwallet Account',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial;
            }

            .text-center {
              text-align: center;
            }

            .text-primary {
              color: #0D6EFD;
            }

            .btn {
              width: 75%;
              outline: none;
              border-radius: .3em;
              background-color: #0D6EFD;
              margin: 0 auto;
              display: block;
            }
            
            a.btn {
              padding: .25em;
              color: white;
              display: block;
              text-align: center;
              text-decoration: none;
              font-size: 1.2em;
            }
          </style>
          <title>Account activation</title>
        </head>
        <body>
          <h1 class="text-center text-primary">Click link below to activate your account</h1>
          <p>Thank you for using <span class="text-primary">Zwallet</span> service.</p>
          <p>Plase activate first your account, so you can use all of great features from <span class="text-primary">Zwallet</span></p>
          <div class="d-grid">
            <a class="btn" href="${controller.CLIENT_BASE_URL}/activate?userId=${userId}&activationToken=${activationToken}">Activate my account</a>
          </div>
        </body>
        </html>
      `
    }, (error, results) => {
      if (error) {
        reject(error)
      }

      resolve(results)
    })
  })
}

module.exports = mailSender
