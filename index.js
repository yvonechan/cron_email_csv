require("dotenv").config();

const express = require("express");
const app = express();
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { parse } = require("json2csv");
const port = 3000;

const sampleData = [
  { Name: "Jack", Age: 30, "Favorite Food": "Pizza", "Favorite Sport": "None" },
  {
    Name: "Mary",
    Age: 22,
    "Favorite Food": "Tapioka",
    "Favorite Sport": "Volleyball",
  },
  {
    Name: "Suki",
    Age: 17,
    "Favorite Food": "Chicken Wings",
    "Favorite Sport": "Running",
  },
  {
    Name: "Manson",
    Age: 35,
    "Favorite Food": "Salmon",
    "Favorite Sport": "Soccer",
  },
  {
    Name: "Yumi",
    Age: 37,
    "Favorite Food": "Fruits",
    "Favorite Sport": "Yoga",
  },
  {
    Name: "Rachel",
    Age: 28,
    "Favorite Food": "Sashimi",
    "Favorite Sport": "Table Tennis",
  },
  {
    Name: "Justin",
    Age: 32,
    "Favorite Food": "Pasta",
    "Favorite Sport": "Swimming",
  },
];

let csv = "";
try {
  csv = parse(sampleData);
  console.log(csv);
} catch (err) {
  console.log(err);
}

// Create mail transporter.
let transporter = nodemailer.createTransport({
  host: "your host url",
  port: number,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

cron.schedule("0 0 * * *", function () {
  console.log("---------------------");
  console.log("Running Cron Job");

  let messageOptions = {
    from: "Sender Email",
    to: "Receiver Email",
    subject: "Test Scheduled Email with CSV attachment",
    text: "This is a testing email with csv attachment.",
    html: "<p>Dear Recipient,</p><p>This is a testing email with csv attachment.</p>",
    attachments: [
      {
        filename: "sampledata.csv",
        content: csv,
        contentType: "text/csv",
      },
    ],
  };

  transporter.sendMail(messageOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
