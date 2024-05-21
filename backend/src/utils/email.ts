import nodemailer from "nodemailer";
import mg from "mailgun-nodemailer-transport";
import { htmlToText } from "html-to-text";
import { type IUser } from "../model/userModel";
import { env } from "./env";
import { readFile } from "fs/promises";

export default class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.firstName = user.fullName.split(" ")[0] || user.fullName;
    this.url = url;
    this.from = `MhL <${env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (env.NODE_ENV === "production") {
      const mailgunAuth = {
        auth: {
          apiKey: env.MAILGUN_KEY,
          domain: env.MAILGUN_DOMAIN,
        },
        tls: {
          rejectUnauthorized: true,
          minVersion: "TLSv1.2",
        },
      };
      return nodemailer.createTransport(new mg(mailgunAuth));
    }

    return nodemailer.createTransport({
      // @ts-expect-error this config is for mailtrap but types belong to mailgun
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USERNAME,
        pass: env.EMAIL_PASSWORD,
      },
    });
  }

  generateHTML(html: string) {
    return html
      .replaceAll("[%userFirstName%]", this.firstName)
      .replaceAll("[%companyName%]", "Meta Blog")
      .replaceAll("[%companySupportEmail%]", env.SUPPORT_EMAIL)
      .replaceAll("[%activationLink%]", this.url);
  }

  async send(template: "welcome", subject: string) {
    // 1. render html based on a pug template
    const htmlTemplate = await readFile(
      `${__dirname}/../templates/${template}.html`,
      "utf-8"
    );
    const html = this.generateHTML(htmlTemplate);

    // 2. define email options
    let mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    if (env.NODE_ENV === "production") {
      mailOptions = {
        from: this.from,
        to: this.to, // An array if you have multiple recipients.
        subject,
        html,
        text: htmlToText(html),
      };
    }

    // 3. create a transport and send email
    await this.newTransport().sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log(info, "message sent 💌");
    });
  }

  async sendWelcome() {
    await this.send("welcome", "welcome to the Meta Blog family");
  }

  //   async sendPasswordReset() {
  //     await this.send(
  //       "passwordReset",
  //       "Your password reset token (valid for only 10 minutes)"
  //     );
  //   }
}

// * it's not a good idea to use gmail in production because we will quickly get spammed and 500 per day limit
// * ACTIVE IN GMAIL: LESS SECURE APP
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: env.EMAIL_USERNAME,
//       pass: env.EMAIL_PASSWORD,
//     },
//   });
