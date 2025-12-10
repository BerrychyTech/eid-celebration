"use server";

import nodemailer from "nodemailer";

export async function sendFleetForm(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const vehicles = formData.get("vehicles");
  const driver = formData.get("driver");
  const message = formData.get("message");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.MAIL_TO,
    subject: "New Fleet Partner Application",
    text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Vehicles: ${vehicles}
Driver: ${driver}
Message: ${message}`,
  });
}
