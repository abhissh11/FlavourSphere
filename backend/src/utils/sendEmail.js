import nodemailer from "nodemailer";

export const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  try {
    // 🧩 Choose transporter based on environment:
    // Use MAILTRAP if available, else fallback to Gmail for local testing
    const transporter = nodemailer.createTransport(
      process.env.SMTP_HOST
        ? {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false, // Mailtrap uses 2525 (non-SSL)
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        }
        : {
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        }
    );

    const { _id, amount, paymentId, items } = orderDetails;

    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2 style="color:#16a34a;">✅ Payment Successful!</h2>
        <p>Thank you for your order! Your payment has been received.</p>
        <h3>Order Details:</h3>
        <ul>
          ${items
        .map(
          (i) =>
            `<li>${i.name} × ${i.quantity} — ₹${i.price * i.quantity}</li>`
        )
        .join("")}
        </ul>
        <p><strong>Total:</strong> ₹${amount}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p>We’ll notify you once your order is shipped.</p>
        <br>
        <p style="font-size:12px;color:#555;">Regards,<br>Fruit Powders Team</p>
      </div>
    `;

    const mailOptions = {
      from: `"Fruit Powders Store" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Order Confirmation - #${_id}`,
      html,
    };

    // 📨 Send email asynchronously
    await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully to ${userEmail}`);
  } catch (error) {
    console.error("❌ Email send failed:", error.message);

    // Optional: detailed debug info for Render logs
    if (error.response) console.error("SMTP response:", error.response);
  }
};
