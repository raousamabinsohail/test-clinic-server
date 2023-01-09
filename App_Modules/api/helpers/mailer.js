const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const res = require('express/lib/response')
const MailLogSchema = require('../models/mail.logs')

exports.mailer = (options)=>{

// initialize nodemailer
var transporter = nodemailer.createTransport(
    {
        host: process.env.SMTP_HOST,
		secure: true,
		port: process.env.SMTP_PORT,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
		// tls: {
		// 	// do not fail on invalid certs
		// 	rejectUnauthorized: false,
		// }
    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/mail-templates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/mail-templates/'),
};




// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


var mailOptions = {
    from: `"Medicare xChain" <${process.env.EMAIL}>`, // sender address
    to: options.context.email, // list of receivers
    subject: options.subject,
    template: options.template, // the name of the template file i.e email.handlebars
    context: options.context
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function(error, info){
    console.log("mailer fucntion start 2")
    if(error){
        mailOptions.error = error
        logMail(mailOptions,"ERROR")
        return console.log(error);
    }
    console.log('Message sent: To '+ options.context.email + ' with response ' + info.response);
    logMail(mailOptions,"SUCCESS")
    return
});
}
//saving logs 
logMail = async (metadata, status) =>{
    try {
        const data = {
            meta: metadata,
            status : status
        };
        const saveLog = await new MailLogSchema(data);
        saveLog.save((err) => {
          if (err) console.log("Log Not Created..");
          else console.log("Email Log Created..");
        });
      } catch (error) {
        console.log(error)
      }
}

// {
//     name: "Adebola", // replace {{name}} with Adebola
//     company: 'knowlegeGate' // replace {{company}} with My Company
// }