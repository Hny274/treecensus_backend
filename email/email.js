var nodemailer=require("nodemailer");
const Mailgen=require("mailgen");

const {user,pass}=require("../mailaccount");

async function loginmail(email,user_name){
    let config={
        service:'gmail',
        auth : {
            user: user,
            pass: pass
        }
    }
    let transporter=nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Treecensus",
            link : 'https://mailgen.js/'
        }
    })
    let response = {
        body: {
            user_name : user_name,
            intro: "We noticed a new sign-in to your Treecensus Account. If this was you, you don't need to do anything. If not, we'll help you secure your account. ",
            outro: "Your Privacy is our Concern."
        }
    }
    let mail = MailGenerator.generate(response)
    let message = {
        from : "hunnygandhi274@gmail.com",
        to : email,
        subject: "Treecensus Application - Security Aleart",
        html: mail
    }
    transporter.sendMail(message).then(() => {
        return;
    }).catch(error => {
      console.log(error);
        return;
    })
}

async function signupnmail(email,user_name,userid) {
    let config = {
        service : 'gmail',
        auth : {
            user: user,
            pass: pass
        }
    }
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Treecensus",
            link : 'https://mailgen.js/'
        }
    })
    let response = {
        body: {
            user_name : user_name,
            intro: "You Request for Sign Up in Treecensus is Registered. Please Verify Your email-id.",
            action: {
                instructions: 'To verify Email, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `http://localhost:2000/api/v1/auth/confirm?tocken=${userid}`
                }
            },
            outro: "Your Privacy is our Concern."
        }
    }
    let mail = MailGenerator.generate(response)
    let message = {
        from : "hunnygandhi274@gmail.com",
        to : email,
        subject: "Treecensus Application - Confirm Email",
        html: mail
    }
    transporter.sendMail(message).then(() => {
        return;
    }).catch(error => {
      console.log(error);
        return;
    })
}
module.exports = {loginmail,signupnmail};