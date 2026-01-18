export const adminOrderNotificationTemplate = ({
  orderId,
  name,
  email,
  contact,
  address,
  instruction,
  items,
  totalPrice,
}) => {
  const orderDate = new Date().toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>🚨 New Order Alert - Orvella Admin</title>
      <style>
        @media only screen and (max-width: 650px) {
          .container { width: 100% !important; }
          .content { padding: 20px !important; }
          .header { padding: 30px 20px !important; }
          .action-buttons { display: block !important; }
          .action-button { display: block !important; margin: 8px 0 !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; line-height: 1.6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table class="container" width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden;">
              
              <!-- Header with Alert Design -->
              <tr>
                <td class="header" style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 30px; position: relative;">
                  <div style="position: relative; z-index: 2;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                      <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">ORVELLA</h1>
                      <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
                        🔥 URGENT ORDER
                      </div>
                    </div>
                    
                    <h2 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.2;">New Order Alert</h2>
                    <p style="color: #cbd5e1; font-size: 16px; margin: 0 0 24px 0;">A new customer order requires immediate processing</p>
                    
                    <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                          <p style="color: #e2e8f0; font-size: 14px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Order ID</p>
                          <p style="color: #ffffff; font-size: 20px; font-weight: 700; font-family: 'Courier New', monospace; margin: 0;">
                            #${orderId.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <div style="text-align: right;">
                          <p style="color: #e2e8f0; font-size: 14px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Total Value</p>
                          <p style="color: #10b981; font-size: 24px; font-weight: 800; margin: 0;">৳${totalPrice}</p>
                        </div>
                      </div>
                      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <p style="color: #e2e8f0; font-size: 13px; margin: 0;">
                          📅 <strong>Order Time:</strong> ${orderDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Content Section -->
              <tr>
                <td class="content" style="padding: 40px 30px;">
                  
                  <!-- Priority Alert -->
                  <div style="background: linear-gradient(135deg, #fef2f2, #fee2e2); border: 2px solid #fecaca; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 40px;">
                    <h4 style="color: #dc2626; font-size: 18px; font-weight: 700; margin: 0 0 8px 0;">⚡ PRIORITY ACTION REQUIRED</h4>
                    <p style="color: #991b1b; font-size: 14px; margin: 0; line-height: 1.5;">
                      Please process this order within <strong>24 hours</strong> to maintain our premium service standards.<br>
                      Customer satisfaction depends on prompt order processing.
                    </p>
                  </div>

                  <!-- Customer Information -->
                  <div style="margin-bottom: 40px;">
                    <h3 style="color: #1f2937; font-size: 22px; font-weight: 700; margin: 0 0 20px 0; display: flex; align-items: center;">
                      <span style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <span style="color: white; font-size: 16px;">👤</span>
                      </span>
                      Customer Information
                    </h3>
                    
                    <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; width: 30%;">
                            <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</strong>
                          </td>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: #1f2937; font-size: 16px; font-weight: 600;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</strong>
                          </td>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:${email}" style="color: #3b82f6; font-size: 16px; font-weight: 600; text-decoration: none; background: #eff6ff; padding: 4px 8px; border-radius: 6px;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</strong>
                          </td>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <a href="tel:${contact}" style="color: #10b981; font-size: 16px; font-weight: 600; text-decoration: none; background: #ecfdf5; padding: 4px 8px; border-radius: 6px;">${contact}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Delivery Address</strong>
                          </td>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 6px;">
                              <span style="color: #78350f; font-size: 15px; font-weight: 600; line-height: 1.5;">${address}</span>
                            </div>
                          </td>
                        </tr>
                        ${instruction ? `
                        <tr>
                          <td style="padding: 12px 0;">
                            <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Special Instructions</strong>
                          </td>
                          <td style="padding: 12px 0;">
                            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 6px;">
                              <span style="color: #78350f; font-size: 15px; font-style: italic; font-weight: 500;">"${instruction}"</span>
                            </div>
                          </td>
                        </tr>
                        ` : `
                        <tr>
                          <td style="padding: 12px 0;">
                            <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Special Instructions</strong>
                          </td>
                          <td style="padding: 12px 0;">
                            <span style="color: #6b7280; font-size: 14px; font-style: italic;">No special instructions provided</span>
                          </td>
                        </tr>
                        `}
                      </table>
                    </div>
                  </div>

                  <!-- Order Items -->
                  <div style="margin-bottom: 40px;">
                    <h3 style="color: #1f2937; font-size: 22px; font-weight: 700; margin: 0 0 20px 0; display: flex; align-items: center;">
                      <span style="width: 36px; height: 36px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <span style="color: white; font-size: 16px;">🛒</span>
                      </span>
                      Order Items (${items.length} ${items.length === 1 ? 'item' : 'items'})
                    </h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                      <thead>
                        <tr style="background: linear-gradient(135deg, #f9fafb, #f3f4f6);">
                          <th style="padding: 16px; text-align: left; font-weight: 700; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Product Details</th>
                          <th style="padding: 16px; text-align: center; font-weight: 700; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Quantity</th>
                          <th style="padding: 16px; text-align: right; font-weight: 700; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Unit Price</th>
                          <th style="padding: 16px; text-align: right; font-weight: 700; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Line Total</th>
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
                              <span style="background: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 16px; font-weight: 700; font-size: 14px;">${item.quantity}</span>
                            </td>
                            <td style="padding: 20px 16px; text-align: right; font-weight: 600; color: #1f2937; font-size: 16px;">৳${item.price}</td>
                            <td style="padding: 20px 16px; text-align: right; font-weight: 800; color: #059669; font-size: 18px;">৳${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        `).join("")}
                      </tbody>
                    </table>
                  </div>

                  <!-- Order Summary -->
                  <div style="background: linear-gradient(135deg, #ecfdf5, #f0fdf4); border-radius: 16px; padding: 24px; border: 2px solid #bbf7d0; margin-bottom: 40px;">
                    <h4 style="color: #166534; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; text-align: center;">💰 Financial Summary</h4>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 16px;">Subtotal</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #374151; font-size: 16px;">৳${totalPrice}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 16px;">Shipping Cost</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #059669; font-size: 16px;">Free</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 16px;">Payment Method</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #f59e0b; font-size: 16px;">Cash on Delivery</td>
                      </tr>
                      <tr style="border-top: 2px solid #bbf7d0;">
                        <td style="padding: 16px 0 0 0; color: #166534; font-size: 20px; font-weight: 800;">Total Collection</td>
                        <td style="padding: 16px 0 0 0; text-align: right; font-weight: 900; color: #166534; font-size: 24px;">৳${totalPrice}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Action Buttons -->
                  <div class="action-buttons" style="text-align: center; margin-bottom: 40px;">
                    <a href="mailto:${email}" class="action-button" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 0 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                      📧 Email Customer
                    </a>
                    <a href="tel:${contact}" class="action-button" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 0 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                      📞 Call Customer
                    </a>
                  </div>

                  <!-- Processing Checklist -->
                  <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb;">
                    <h4 style="color: #1f2937; font-size: 18px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">📋 Order Processing Checklist</h4>
                    <div style="text-align: left; max-width: 400px; margin: 0 auto;">
                      <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">☐ Verify customer contact information</span>
                      </div>
                      <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">☐ Confirm product availability</span>
                      </div>
                      <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">☐ Call customer for order confirmation</span>
                      </div>
                      <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">☐ Prepare items for packaging</span>
                      </div>
                      <div style="padding: 8px 0;">
                        <span style="color: #6b7280; font-size: 14px;">☐ Schedule delivery/pickup</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(135deg, #1f2937, #374151); padding: 30px; text-align: center;">
                  <h3 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.5px;">ORVELLA</h3>
                  <p style="color: #d1d5db; font-size: 14px; margin: 0 0 20px 0;">Premium Fashion & Lifestyle - Admin Dashboard</p>
                  
                  <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 16px;">
                    <p style="color: #f3f4f6; font-size: 13px; margin: 0; line-height: 1.6;">
                      <strong>System Alert:</strong> This notification was automatically generated by the Orvella order management system.<br>
                      Please ensure timely processing to maintain customer satisfaction and business reputation.
                    </p>
                  </div>
                  
                  <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
                    © ${new Date().getFullYear()} Orvella. All rights reserved. | Admin Notification System
                  </p>
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