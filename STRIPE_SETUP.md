# Stripe Payment Integration Guide

## Overview
This guide explains how to set up and use Stripe payment integration in the Orvella e-commerce platform.

## Setup Instructions

### 1. Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or log in
3. Navigate to **Developers** → **API keys**
4. Copy your **Publishable key** and **Secret key**

### 2. Configure Environment Variables

Update your `.env` file with your Stripe keys:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Important:** 
- Use test keys (starting with `sk_test_` and `pk_test_`) for development
- Use live keys (starting with `sk_live_` and `pk_live_`) for production
- Never commit your secret keys to version control

### 3. Test the Integration

#### Test Card Numbers (Stripe Test Mode)

Use these test card numbers in Stripe test mode:

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 9995 | Declined payment |
| 4000 0025 0000 3155 | Requires authentication |

- Use any future expiry date (e.g., 12/34)
- Use any 3-digit CVC
- Use any postal code

## Features Implemented

### 1. Payment Flow
- Customer fills checkout form with shipping details
- Selects payment method (COD or Stripe)
- For Stripe: Redirects to secure Stripe checkout page
- After payment: Redirects to success or cancel page

### 2. API Routes

#### `/api/create-checkout-session` (POST)
Creates a Stripe checkout session with order details.

**Request Body:**
```json
{
  "items": [...],
  "customerEmail": "customer@example.com",
  "customerName": "John Doe",
  "totalAmount": 1500
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

#### `/api/verify-payment` (POST)
Verifies payment and creates order record.

**Query Parameters:**
- `session_id`: Stripe checkout session ID

**Response:**
```json
{
  "success": true,
  "paymentId": "...",
  "orderId": "...",
  "transactionId": "pi_..."
}
```

### 3. Payment Pages

#### Success Page (`/payment-success`)
- Displays payment confirmation
- Shows transaction ID
- Links to order history and continue shopping

#### Cancel Page (`/payment-cancelled`)
- Informs user payment was cancelled
- Explains why cancellation might occur
- Provides options to return to cart or continue shopping

## Database Schema

### Payments Collection
```javascript
{
  customerName: String,
  customerEmail: String,
  amount: Number,
  currency: String,
  transactionId: String,
  paymentStatus: String,
  paidAt: Date,
  sessionId: String
}
```

### Orders Collection (with Stripe)
```javascript
{
  userId: String,
  customerName: String,
  customerEmail: String,
  items: Array,
  totalAmount: Number,
  paymentMethod: "stripe",
  paymentStatus: "paid",
  transactionId: String,
  orderStatus: "pending",
  createdAt: Date
}
```

## Security Best Practices

1. **Never expose secret keys** - Keep `STRIPE_SECRET_KEY` server-side only
2. **Validate on server** - Always verify payment status on the server
3. **Use webhooks** - Implement Stripe webhooks for production (recommended)
4. **HTTPS only** - Always use HTTPS in production
5. **Amount validation** - Verify amounts match on server-side

## Testing Checklist

- [ ] Successful payment flow
- [ ] Payment cancellation flow
- [ ] Payment verification
- [ ] Order creation after payment
- [ ] Email notifications (if configured)
- [ ] Error handling
- [ ] Mobile responsiveness

## Troubleshooting

### Common Issues

**Issue:** "Invalid API Key"
- **Solution:** Check that your Stripe keys are correctly set in `.env`

**Issue:** "Payment not verified"
- **Solution:** Ensure the session_id is passed correctly in the URL

**Issue:** "Redirect not working"
- **Solution:** Verify `NEXTAUTH_URL` is set correctly in `.env`

## Going Live

Before going live:

1. Replace test API keys with live keys
2. Test with real card (small amount)
3. Set up Stripe webhooks for production
4. Enable 3D Secure authentication
5. Configure email notifications
6. Set up proper error logging
7. Review Stripe dashboard settings

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing](https://stripe.com/docs/testing)

## Notes

- Currency is set to USD by default (can be changed in API route)
- Prices are converted to cents (multiply by 100)
- Session expires after 24 hours
- Payment intent is created automatically by Stripe
