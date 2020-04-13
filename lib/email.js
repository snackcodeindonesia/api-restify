const mail = require('@sendgrid/mail');
const MailGen = require('mailgen');
const dotenv  = require('dotenv').config();
const fs = require('fs');

mail.setApiKey(dotenv.parsed.SENDGRID_API_KEY);

const mailGenerator = new MailGen({
    theme: 'salted',
    product: {
      name: 'Awesome App',
      link: 'http://example.com',
    },
})
  
const email = {
    body: {
      name: 'Jon Doe',
      intro: 'Welcome to email verification',
      action: {
        instructions: 'Please click the button below to verify your account',
        button: {
          color: '#33b5e5',
          text: 'Verify account',
          link: 'http://example.com/verify_account',
        },
      },
    },
}
  
const template = mailGenerator.generate(email);
fs.writeFileSync('preview.html', template, 'utf8');
function sendgrid(data) {
    const msg = {
        to: 'email',    
        from: dotenv.parsed.EMAIL_FROM,
        subject: 'Register backTick.com',
        text: 'Test verification email',
        html: template,
    };

    try {
        return mail.send(msg)
    } catch (error) {
        throw new Error(error.message)
    }
 }

 exports.sendgrid = sendgrid;