import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log('📧 Starting email send process...');
    console.log('📧 To:', to);
    console.log('📧 Subject:', subject);
    
    // Validate required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email configuration missing');
      throw new Error('Email configuration missing: EMAIL_USER and EMAIL_PASS are required');
    }

    console.log('✅ Email credentials available');
    console.log('📧 Using email:', process.env.EMAIL_USER);

    // Create transporter with explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log('🔌 Testing SMTP connection...');
    
    // Verify transporter configuration
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    console.log('📤 Sending email...');
    
    // Send email
    const info = await transporter.sendMail({
      from: `"Orvella" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Response:', info.response);

    return { 
      success: true, 
      messageId: info.messageId,
      response: info.response,
      to: to,
      subject: subject
    };

  } catch (error) {
    console.error('❌ Email Error:', error.message);
    
    return { 
      success: false, 
      error: error.message,
    };
  }
};

export const sendInvoiceEmail = async ({ to, userName, orderItems, totalPrice, orderId }) => {
  try {
    const itemsHTML = orderItems
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.title}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">৳${item.price}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">৳${item.price * item.quantity}</td>
        </tr>
      `
      )
      .join("");

    const html = `
      <h2>Order Confirmation - Orvella</h2>
      <p>Dear ${userName},</p>
      <p>Thank you for your order!</p>
      
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: left;">Price</th>
            <th style="padding: 10px; text-align: left;">Qty</th>
            <th style="padding: 10px; text-align: left;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemsHTML}</tbody>
      </table>
      
      <h3 style="text-align: right; margin-top: 20px;">Total: ৳${totalPrice}</h3>
      <p>Thank you for shopping with Orvella!</p>
    `;

    const result = await sendEmail({
      to,
      subject: `Order Invoice #${orderId} - Orvella`,
      html,
    });

    return result;
  } catch (error) {
    console.error('Invoice Email Error:', error.message);
    return { success: false, error: error.message };
  }
};