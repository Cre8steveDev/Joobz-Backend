import * as Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import * as path from 'path';
import {
  GOOGLE_APP_PASSWORD,
  GOOGLE_SENDER_MAIL,
  GOOGLE_USER,
} from '../config';
import * as nodemailer from 'nodemailer';

/**
 * Main Function wraper for sending email message to any user.
 * @param template - Provide the name of the template stored in the html directory. Do not include the .hbs extension
 * @param recipient - Email Address of the person receiving the email message.
 * @param subject - Subject of the Email you're sending.
 * @param data - Data that will be compiled into your handlebars template
 * @returns - Void. But logs out Unable to read file.
 */
async function main(
  template: string,
  recipient: string,
  subject: string,
  data: any
) {
  const html = await readHtmlTemplate(template, data);

  if (html === '') {
    console.log('UNABLE TO READ TEMPLATE FILE');
    return;
  }
  sendEmailMessage(recipient, subject, html);
}

export default main;

// Function to Read Template file
const readHtmlTemplate = async (templatename: string, data: any) => {
  try {
    const templatePath = path.join(
      __dirname,
      '..',
      'html',
      `${templatename}.hbs`
    );
    const htmlSource = readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(htmlSource);
    const html = template(data);

    return html;
  } catch (error) {
    console.log('ERROR READING TEMPLATE: ', error);
    return '';
  }
};

// Define Send Email Function
const sendEmailMessage = async (
  recipient: string,
  subject: string,
  html: string
) => {
  // Define transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: GOOGLE_USER,
      pass: GOOGLE_APP_PASSWORD,
    },
  });

  // Define Mail Options
  const mailOptions = {
    from: GOOGLE_SENDER_MAIL,
    to: recipient,
    subject: subject,
    html: html,
  };

  //   Send Mail with the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};
