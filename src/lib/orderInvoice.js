export const orderInvoiceTemplate = ({ orderId, items, totalPrice, customerName, customerEmail, shippingAddress, phone }) => {
  const orderDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Orvella</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .content { padding: 20px !important; }
          .header { padding: 30px 20px !important; }
          .grid { display: block !important; }
          .grid-item { width: 100% !important; margin-bottom: 20px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table class="container" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden;">
              
              <!-- Header with Gradient -->
              <tr>
                <td class="header" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center; position: relative;">
                  <div style="position: relative; z-index: 2;">
                    <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.5px;">ORVELLA</h1>
                    <p style="color: #fecaca; font-size: 16px; margin: 0 0 24px 0; font-weight: 500;">Premium Fashion & Lifestyle</p>
                    
                    <div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
                      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                        <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                          <span style="font-size: 20px;">✅</span>
                        </div>
                        <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0;">Order Confirmed!</h2>
                      </div>
                      <p style="color: #ffffff; font-size: 18px; font-weight: 600; font-family: 'Courier New', monospace; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 8px; display: inline-block; margin: 0;">
                        #${orderId.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Content Section -->
              <tr>
                <td class="content" style="padding: 40px 30px;">
                  
                  <!-- Personal Greeting -->
                  <div style="text-align: center; margin-bottom: 40px;">
                    <h3 style="color: #1f2937; font-size: 24px; font-weight: 700; margin: 0 0 12px 0;">Hello ${customerName || 'Valued Customer'}!</h3>
                    <p style="color: #6b7280; font-size: 16px; margin: 0; line-height: 1.6;">Thank you for choosing Orvella. Your order has been confirmed and will be processed shortly. We'll keep you updated every step of the way.</p>
                  </div>

                  <!-- Order Details Card -->
                  <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 16px; padding: 24px; margin-bottom: 40px; border: 1px solid #bae6fd;">
                    <h4 style="color: #0c4a6e; font-size: 18px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">📋 Order Information</h4>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 14px; font-weight: 600;">Order Date:</td>
                        <td style="padding: 8px 0; text-align: right; color: #1f2937; font-size: 14px; font-weight: 700;">${orderDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 14px; font-weight: 600;">Order ID:</td>
                        <td style="padding: 8px 0; text-align: right; color: #1f2937; font-size: 14px; font-weight: 700; font-family: 'Courier New', monospace;">#${orderId.slice(-8).toUpperCase()}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 14px; font-weight: 600;">Customer Email:</td>
                        <td style="padding: 8px 0; text-align: right; color: #3b82f6; font-size: 14px; font-weight: 700;">${customerEmail || 'N/A'}</td>
                      </tr>
                      ${phone ? `
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 14px; font-weight: 600;">Phone:</td>
                        <td style="padding: 8px 0; text-align: right; color: #10b981; font-size: 14px; font-weight: 700;">${phone}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </div>

                  <!-- Order Items -->
                  <div style="margin-bottom: 40px;">
                    <h4 style="color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; display: flex; align-items: center;">
                      <span style="width: 32px; height: 32px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <span style="color: white; font-size: 16px;">🛍️</span>
                      </span>
                      Your Items
                    </h4>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                      <thead>
                        <tr style="background: linear-gradient(135deg, #f9fafb, #f3f4f6);">
                          <th style="padding: 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Product</th>
                          <th style="padding: 16px; text-align: center; font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Qty</th>
                          <th style="padding: 16px; text-align: right; font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Price</th>
                          <th style="padding: 16px; text-align: right; font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${items.map((item, index) => `
                          <tr style="border-top: 1px solid #f3f4f6; ${index % 2 === 1 ? 'background-color: #fafafa;' : ''}">
                            <td style="padding: 20px 16px;">
                              <div style="font-weight: 600; color: #1f2937; font-size: 16px; margin-bottom: 4px;">${item.title}</div>
                              <div style="color: #6b7280; font-size: 13px;">SKU: ${item._id.slice(-8).toUpperCase()}</div>
                            </td>
                            <td style="padding: 20px 16px; text-align: center;">
                              <span style="background: #f3f4f6; color: #374151; padding: 4px 12px; border-radius: 16px; font-weight: 600; font-size: 14px;">${item.quantity}</span>
                            </td>
                            <td style="padding: 20px 16px; text-align: right; font-weight: 600; color: #1f2937; font-size: 16px;">৳${item.price}</td>
                            <td style="padding: 20px 16px; text-align: right; font-weight: 700; color: #059669; font-size: 18px;">৳${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        `).join("")}
                      </tbody>
                    </table>
                  </div>

                  <!-- Order Summary -->
                  <div style="background: linear-gradient(135deg, #ecfdf5, #f0fdf4); border-radius: 16px; padding: 24px; border: 2px solid #bbf7d0; margin-bottom: 40px;">
                    <h4 style="color: #166534; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; text-align: center;">💰 Order Summary</h4>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 16px;">Subtotal</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #374151; font-size: 16px;">৳${totalPrice}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 16px;">Shipping</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #059669; font-size: 16px;">Free</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 16px;">Tax</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #374151; font-size: 16px;">Included</td>
                      </tr>
                      <tr style="border-top: 2px solid #bbf7d0;">
                        <td style="padding: 16px 0 0 0; color: #166534; font-size: 20px; font-weight: 700;">Total Amount</td>
                        <td style="padding: 16px 0 0 0; text-align: right; font-weight: 800; color: #166534; font-size: 24px;">৳${totalPrice}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Shipping Information -->
                  ${shippingAddress ? `
                  <div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 40px;">
                    <h5 style="color: #92400e; font-size: 16px; font-weight: 700; margin: 0 0 12px 0; display: flex; align-items: center;">
                      <span style="margin-right: 8px; font-size: 18px;">🏠</span>
                      Shipping Address
                    </h5>
                    <p style="color: #78350f; font-size: 14px; margin: 0; line-height: 1.5;">
                      <strong>${customerName || 'Customer'}</strong><br>
                      ${shippingAddress}<br>
                      ${phone ? `Phone: ${phone}` : ''}
                    </p>
                  </div>
                  ` : ''}

                  <!-- Payment & Delivery Info -->
                  <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                    <div class="grid-item" style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px;">
                      <h5 style="color: #92400e; font-size: 16px; font-weight: 700; margin: 0 0 12px 0; display: flex; align-items: center;">
                        <span style="margin-right: 8px; font-size: 18px;">💳</span>
                        Payment Method
                      </h5>
                      <p style="color: #78350f; font-size: 14px; margin: 0; line-height: 1.5;">
                        <strong>Cash on Delivery</strong><br>
                        Pay when your order arrives<br>
                        <em>No advance payment required</em>
                      </p>
                    </div>
                    
                    <div class="grid-item" style="background: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px;">
                      <h5 style="color: #1e40af; font-size: 16px; font-weight: 700; margin: 0 0 12px 0; display: flex; align-items: center;">
                        <span style="margin-right: 8px; font-size: 18px;">🚚</span>
                        Delivery Info
                      </h5>
                      <p style="color: #1e3a8a; font-size: 14px; margin: 0; line-height: 1.5;">
                        <strong>2-5 Business Days</strong><br>
                        Free nationwide delivery<br>
                        <em>Track your order via SMS</em>
                      </p>
                    </div>
                  </div>

                  <!-- What's Next -->
                  <div style="background: #f8fafc; border-radius: 12px; padding: 24px; text-align: center; border: 1px solid #e5e7eb; margin-bottom: 40px;">
                    <h4 style="color: #1f2937; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">🎯 What happens next?</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
                      <div style="padding: 16px;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                          <span style="color: white; font-size: 20px;">📞</span>
                        </div>
                        <p style="color: #374151; font-size: 13px; margin: 0; font-weight: 600;">Order Confirmation Call</p>
                        <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0;">Within 24 hours</p>
                      </div>
                      <div style="padding: 16px;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                          <span style="color: white; font-size: 20px;">📦</span>
                        </div>
                        <p style="color: #374151; font-size: 13px; margin: 0; font-weight: 600;">Careful Packaging</p>
                        <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0;">Quality assured</p>
                      </div>
                      <div style="padding: 16px;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                          <span style="color: white; font-size: 20px;">🚚</span>
                        </div>
                        <p style="color: #374151; font-size: 13px; margin: 0; font-weight: 600;">Fast Delivery</p>
                        <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0;">To your doorstep</p>
                      </div>
                    </div>
                  </div>

                  <!-- Trust Badges -->
                  <div style="text-align: center; margin-bottom: 40px;">
                    <h4 style="color: #1f2937; font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">🛡️ Your Trust, Our Priority</h4>
                    <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
                      <div style="text-align: center;">
                        <div style="width: 40px; height: 40px; background: #ecfdf5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                          <span style="color: #059669; font-size: 16px;">✅</span>
                        </div>
                        <p style="color: #374151; font-size: 12px; margin: 0; font-weight: 600;">Quality Guaranteed</p>
                      </div>
                      <div style="text-align: center;">
                        <div style="width: 40px; height: 40px; background: #fef3c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                          <span style="color: #d97706; font-size: 16px;">🔄</span>
                        </div>
                        <p style="color: #374151; font-size: 12px; margin: 0; font-weight: 600;">Easy Returns</p>
                      </div>
                      <div style="text-align: center;">
                        <div style="width: 40px; height: 40px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                          <span style="color: #1d4ed8; font-size: 16px;">🔒</span>
                        </div>
                        <p style="color: #374151; font-size: 12px; margin: 0; font-weight: 600;">Secure Shopping</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(135deg, #1f2937, #374151); padding: 30px; text-align: center;">
                  <h3 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.5px;">ORVELLA</h3>
                  <p style="color: #d1d5db; font-size: 14px; margin: 0 0 20px 0;">Premium Fashion & Lifestyle</p>
                  
                  <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                    <p style="color: #f3f4f6; font-size: 14px; margin: 0 0 8px 0; line-height: 1.6;">
                      <strong>Need help?</strong> We're here for you!
                    </p>
                    <p style="color: #f3f4f6; font-size: 14px; margin: 0; line-height: 1.6;">
                      📧 <strong>support@orvella.com</strong> | 📞 <strong>+880 1700-123456</strong>
                    </p>
                  </div>
                  
                  <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} Orvella. All rights reserved.<br>
                      This is an automated email confirmation. Please do not reply to this email.
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};