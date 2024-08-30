import { sendEmail } from "@/app/utils/sendEmail";

const { default: NewsLetter } = require("@/models/newLeterModel");
const { NextResponse } = require("next/server");

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
    const newsLetter = await NewsLetter.create({
      email,
    });
    await sendEmail(
      newsLetter.email,
      "Thank you for subscribing to our newsletter",
      `Thank you for subscribing to our newsletter, ${newsLetter.email}`
    );

    return NextResponse.json({ newsLetter }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
