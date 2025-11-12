import nodemailer from "nodemailer";

export const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const { _id, amount, paymentId, items } = orderDetails;

    const mailOptions = {
      from: `"Fruit Powders Store" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Order Confirmation - #${_id}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2 style="color:#16a34a;">✅ Payment Successful!</h2>
          <p>Thank you for your order! Your payment has been received.</p>
          <h3>Order Details:</h3>
          <ul>
            ${items.map((i) => `<li>${i.name} × ${i.quantity} — ₹${i.price * i.quantity}</li>`).join("")}
          </ul>
          <p><strong>Total:</strong> ₹${amount}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p>We’ll notify you once your order is shipped.</p>
          <br>
          <p style="font-size:12px;color:#555;">Regards,<br>Fruit Powders Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
  }
};
