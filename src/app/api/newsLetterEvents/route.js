import { sendEmail } from "@/app/utils/sendEmail";
import { sendHtmlEmail } from "@/app/utils/sendHtmlEmail";
const { default: NewsLetter } = require("@/models/newLeterModel");
const { NextResponse } = require("next/server");

export async function POST(req) {
  try {
    const reqBody = await req.json();
    // const { news, subject, productName, productPrice, productDescription, imageUrl } = reqBody;
    const { emailType, emailData } = reqBody;

    // Fetch all emails
    const emails = await NewsLetter.find({});
    // console.log(emails);

    // Create an array of promises for sending emails
    const emailPromises = emails.map((email) => {
      const to = email.email
      return sendHtmlEmail(
        // email.email,
        // subject,
        // productName,
        // productPrice,
        // productDescription,
        // imageUrl
        to,
        emailType,
        emailData
      );
    });
    console.log(emailData, "purchase email data");
    // Wait for all email sending promises to resolve
    await Promise.all(emailPromises);

    return NextResponse.json({ message: "Emails sent successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
