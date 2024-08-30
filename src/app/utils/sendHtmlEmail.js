import { connection } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
import { google } from "googleapis";

connection();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const createPurchaseTemplate = (emailData) => {
  const productList = emailData
    .map(
      (product) => `
    <tr>
      <td><img src="${product.image}" alt="${product.name}" style="width:50px;height:50px;"></td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
    </tr>
  `
    )
    .join("");

  const totalAmount = emailData.reduce((total, product) => total + parseFloat(product.price), 0);
  const customerName = emailData[0].user.first_name + " " + emailData[0].user.last_name;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Purchase Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .cta-button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Purchase Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${customerName},</p>
          <p>Thank you for your purchase! Here are the details of your order:</p>
          <table>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
            </tr>
            ${productList}
          </table>
          <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
          <p>We hope you enjoy your new products!</p>
          <a href="#" class="cta-button">View Your Account</a>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createNewProductTemplate = (productName, productPrice, productDescription, imageUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Product Announcement</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .product-image { max-width: 100%; height: auto; display: block; margin: 20px auto; }
        .cta-button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Product Announcement</h1>
        </div>
        <div class="content">
          <p>Hi there!</p>
          <p>We're excited to announce a new addition to our store:</p>
          <h2>${productName}</h2>
          <p><strong>Price:</strong> $${productPrice}</p>
          <p>${productDescription}</p>
          <img src="${imageUrl}" alt="${productName}" class="product-image">
          <p>Be among the first to get your hands on this amazing new product!</p>
          <a href="#" class="cta-button">Shop Now</a>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendHtmlEmail = async (to, emailType, emailData) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "afrazrajpoot46@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    let mailOptions;

    if (emailType === "purchase") {
      mailOptions = {
        from: "Sonduckfilm <afrazrajpoot46@gmail.com>",
        to: to,
        subject: `Thank you for your purchase,!`,
        html: createPurchaseTemplate(emailData),
      };
    } else if (emailType === "newProduct") {
      const { productName, productPrice, productDescription, imageUrl } = emailData;
      mailOptions = {
        from: "Sonduckfilm <afrazrajpoot46@gmail.com>",
        to: to,
        subject: `New Product Announcement: ${productName}`,
        html: createNewProductTemplate(productName, productPrice, productDescription, imageUrl),
      };
    } else {
      throw new Error("Invalid email type");
    }

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error, "Error sending mail");
  }
};
