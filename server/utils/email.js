const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.url = url;

        this.from = `Zak AIDOUNI <${process.env.EMAIL_FROM}>`;
    }

    newTransport(){
        if(process.env.ENV === "production"){
            //sand grid
            console.log('rr')
            return nodemailer.createTransport({
                // service : 'Sendgrid',
                // auth: {
                //     user: process.env.SENDGRID_USERNAME,
                //     pass: process.env.SENDGRID_PASSWORD
                //   }


                    host: process.env.SENDINBLUE_HOST,
                    port: process.env.SENDINBLUE_PORT,
                    auth: {
                      user: process.env.SENDINBLUE_USERNAME,
                      pass: process.env.SENDINBLUE_PASSWORD
                    }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
        });

         
    }

    //send the actual email 
    async send(template, subject)
    {
        // 1 render HTML based on a pub template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName : this.firstName,
            lastName : this.lastName,
            url : this.url,
            subject
        });

        // 2 define email options
        const mailOptions = {
            from : this.from,
            to : this.to,
            subject  : subject,
            html : html,
            text  : htmlToText.convert(html,{})
        }

        // 3 create a transport and send email 

        await this.newTransport().sendMail(mailOptions);
    }


    async sendWelcome(){
        await this.send('welcome', 'Welcome to the APP');
    }

    async sendPasswordReset(){
        await this.send('passwordReset', 'Your Password reset token (valide for 10 minutes)');
    }
}


// const sendEmail = async options => {
//     //1 create a transporter 
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//           user: process.env.EMAIL_USERNAME,
//           pass: process.env.EMAIL_PASSWORD
//         }
//       });

//     //2 define the email options 
    

//     //3 actually send the email 
//     await transporter.sendMail(mailOptions);
// }

// module.exports = sendEmail;