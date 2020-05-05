/* Set an Env variable named SENDGRID_API_KEY with the following commands:
    echo "export SENDGRID_API_KEY='InHereTheAPIKeyFromSendgridWebsite'" > sendgrid.env
    echo "sendgrid.env" >> .gitignore
    source ./sendgrid.env
*/
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'matthew78uk@gmail.com',
        subject: 'Welcome to Task Manager App!',
        text: `Hi ${name}, thank you for joing the Task manager App.`
    }).then(() => {
        console.log(`Email sent successfully to ${ email }`);
    }).catch((e) => {
        console.log('Error', e);
    });
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'matthew78uk@gmail.com',
        subject: 'Sorry to see you leave.',
        text: `Hi ${ name }, sorry you are leaving. Please let us know how to improve our service.`
    }).then(() => {
        console.log(`Email sent successfully to ${ email }`);
    }).catch(()=> {
        console.log('Error', e);
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

// const msg = {
//     to: '******@gmail.com',
//     from: '********@gmail.com',
//     subject: 'Test Msg for SendGrid.',
//     text: 'Just trying to use Sendgrid\'s email service.',
//     html: '<strong>Also trying to send an HTML styles message!</strong>',
//   };

// sgMail.send(msg).then(() =>{
//     console.log('Email sent sucessfully');
//     }).catch((e) =>{
//         console.log('Error: ', e);
// });

// console.log(process.env.SENDGRID_API_KEY);
 