# 👗 Orvella - Premium Fashion E-commerce Platform

<div align="center">

**A modern, full-stack Next.js e-commerce application for premium fashion retail**

![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black?style=for-the-badge&logo=next.js&logoColor=white)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-20.4.0-008CDD?style=flat&logo=stripe&logoColor=white)](https://stripe.com/)

<a href="https://orvella-zeta.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/LIVE%20DEMO-Visit%20Site-ef4444?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
</a>

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**Orvella** is a production-ready, full-stack e-commerce platform built with **Next.js 16 App Router**, designed for premium fashion retail. It provides a complete shopping experience from product browsing to order fulfillment, with comprehensive admin management capabilities.

### Why Orvella?

- ✅ **Modern Next.js 16**: App Router with React Server Components for optimal performance
- ✅ **Complete E-commerce Solution**: Full shopping flow from browsing to checkout
- ✅ **Dual Payment Options**: Cash on Delivery (COD) + Stripe integration
- ✅ **Professional Email System**: Automated transactional emails with beautiful HTML templates
- ✅ **Role-Based Access Control**: Secure admin dashboard with product and order management
- ✅ **Mobile-First Design**: Fully responsive UI built with TailwindCSS 4 and DaisyUI
- ✅ **SEO Optimized**: Server-side rendering with comprehensive metadata
- ✅ **Production Ready**: Deployed on Vercel with MongoDB Atlas

---

## ✨ Key Features

### 🛍️ Customer Features

**Product Browsing & Discovery**
- Browse by categories (Men, Women, Kids)
- Best Sellers and New Arrivals sections
- Product details with images, pricing, discounts, and reviews
- Search and filter functionality
- Responsive grid layout (2-4 columns)

**Shopping Cart**
- Real-time cart updates
- Quantity management (1-10 limit)
- Persistent storage across sessions
- Live price calculation with discounts

**Checkout & Payment**
- Multi-step checkout process
- Form validation with error messages
- **Cash on Delivery (COD)** - Immediate order confirmation
- **Stripe Card Payment** - Secure hosted checkout
- Smart pricing: Free shipping on orders ≥ ৳5,000
- 5% bulk discount on orders ≥ ৳10,000

**Order Management**
- View order history with details
- Real-time status tracking (Confirmed → Processing → Shipped → Delivered)
- Order cancellation (before shipping)
- Email notifications for all order updates

**Authentication**
- Email/Password registration with validation
- Google OAuth one-click login
- Provider mismatch detection
- Welcome emails on registration

### 👨‍💼 Admin Features

**Product Management**
- Add, edit, and delete products
- Product statistics dashboard
- Search and filter products
- Stock management

**Order Management**
- View all orders with filtering
- Update order status with automated customer notifications
- Order statistics by status
- Access customer information and shipping details

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.2 | React framework with App Router |
| **React** | 19.2.3 | UI library for building interfaces |
| **MongoDB** | 7.0.0 | NoSQL database with native driver |
| **NextAuth.js** | 4.24.13 | Authentication and session management |
| **Stripe** | 20.4.0 | Payment processing platform |
| **Nodemailer** | 7.0.12 | Email delivery service |
| **TailwindCSS** | 4.1.18 | Utility-first CSS framework |
| **DaisyUI** | 5.5.14 | Component library for Tailwind |
| **bcryptjs** | 3.0.3 | Password hashing and verification |

### Additional Libraries

- **SweetAlert2** (11.26.17) - Beautiful alert modals
- **React Icons** (5.5.0) - Icon library
- **Swiper** (12.0.3) - Touch slider for carousels
- **@stripe/stripe-js** (8.8.0) - Stripe client integration
- **@heroicons/react** (2.2.0) - Heroicons for React

### Cloud Services

- **Vercel** - Frontend and API hosting
- **MongoDB Atlas** - Cloud-hosted database
- **Stripe** - Payment processing
- **Gmail SMTP** - Email delivery

---

## 📁 Project Structure

```
orvella/
├── public/                      # Static assets
│   └── assets/                  # Product images
├── src/
│   ├── actions/server/          # Server Actions
│   │   ├── auth.js              # Authentication (register, login)
│   │   ├── cart.js              # Cart management
│   │   ├── order.js             # Order operations
│   │   └── Product.js           # Product queries
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API Routes
│   │   │   ├── auth/[...nextauth]/route.js
│   │   │   ├── create-checkout-session/route.js
│   │   │   └── verify-payment/route.js
│   │   ├── (pages)/             # Application pages
│   │   │   ├── products/        # Product listing & details
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── checkout/        # Checkout process
│   │   │   ├── my-orders/       # User orders
│   │   │   ├── orders/          # Admin orders (protected)
│   │   │   ├── add-product/     # Admin product add (protected)
│   │   │   └── ...
│   │   ├── layout.jsx           # Root layout
│   │   └── page.jsx             # Homepage
│   ├── components/              # React Components
│   │   ├── admin/               # Admin components
│   │   ├── auth/                # Auth forms
│   │   ├── Cards/               # Product & cart cards
│   │   ├── home/                # Homepage sections
│   │   ├── layouts/             # Navbar, Footer
│   │   └── ...
│   └── lib/                     # Utilities
│       ├── authOptions.js       # NextAuth config
│       ├── dbConnect.js         # MongoDB connection
│       ├── sendEmail.js         # Email service
│       ├── orderInvoice.js      # Email templates
│       └── AdminInvoice.js      # Admin notifications
├── .env                         # Environment variables
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies
└── tailwind.config.js           # Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Cloud Console account (for OAuth)
- Stripe account
- Gmail account (for emails)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/orvella.git
cd orvella
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) section)

4. **Start the development server**

```bash
npm run dev
```

Visit `http://localhost:3000`

5. **Build for production**

```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=orvelladb

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_generate_with_openssl

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin_notification_email@gmail.com

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### Setup Instructions

**MongoDB Atlas:**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and database user
3. Whitelist IP address (0.0.0.0/0 for development)
4. Copy connection string to `MONGODB_URI`

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret

**Stripe:**
1. Create account at [stripe.com](https://stripe.com/)
2. Get test API keys from Dashboard → Developers → API keys
3. Use test keys for development, live keys for production

**Gmail:**
1. Enable 2-factor authentication
2. Generate App Password: Google Account → Security → App passwords
3. Use app password (not Gmail password)

**NextAuth Secret:**
```bash
openssl rand -base64 32
```

---

## 💾 Database Schema

### Collections

**users**
```javascript
{
  _id: ObjectId,
  email: String,              // Unique, lowercase
  password: String,           // bcrypt hashed
  name: String,
  image: String,              // Profile photo URL
  role: String,               // "user" or "admin"
  provider: String            // "credentials" or "google"
}
```

**products**
```javascript
{
  _id: ObjectId,
  title: String,
  price: Number,
  discount: Number,           // Percentage (0-100)
  category: String,           // "men", "women", "kids"
  description: String,
  image: String,
  stock: Number,
  featured: Boolean,
  sold: Number,
  reviews: Number,
  rating: Number
}
```

**cart**
```javascript
{
  _id: ObjectId,
  email: String,              // User email
  productId: ObjectId,
  title: String,
  quantity: Number,           // 1-10
  image: String,
  price: Number               // Discounted price
}
```

**orders**
```javascript
{
  _id: ObjectId,
  userId: String,
  userEmail: String,
  userName: String,
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  city: String,
  postalCode: String,
  items: Array,               // Order items
  totalPrice: Number,
  paymentMethod: String,      // "cod" or "stripe"
  paymentStatus: String,      // "pending" or "paid"
  transactionId: String,      // Stripe payment intent ID
  status: String,             // Order status
  createdAt: String
}
```

**payments**
```javascript
{
  _id: ObjectId,
  customerName: String,
  customerEmail: String,
  amount: Number,
  currency: String,
  transactionId: String,      // Unique
  paymentStatus: String,
  sessionId: String,
  paidAt: Date
}
```

---

## 🔒 Security Features

### Authentication & Authorization
- **bcrypt password hashing** (14 rounds)
- **JWT session tokens** with NextAuth.js
- **Role-based access control** (User/Admin)
- **Server-side session validation**
- **Provider mismatch detection**

### Data Security
- **MongoDB Atlas** encrypted connections
- **Environment variables** for all secrets
- **Input validation** on client and server
- **HTTPS enforcement** in production
- **Stripe PCI compliance** with hosted checkout

### Best Practices
- No plain text passwords
- Secure cookie storage
- Protected API routes
- Server-side authorization checks
- Transaction ID tracking

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Push to Git repository**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Next.js

3. **Configure environment variables**
   - Add all variables from `.env` in Vercel Dashboard
   - Update `NEXTAUTH_URL` to your Vercel domain

4. **Update OAuth redirect URIs**
   - Google Cloud Console: Add `https://your-domain.vercel.app/api/auth/callback/google`

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] OAuth redirect URIs updated
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Test authentication flow
- [ ] Test payment flow (Stripe test mode)
- [ ] Verify email delivery
- [ ] Check mobile responsiveness

---

## 📡 API Routes & Server Actions

### API Routes

**Authentication**
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handler

**Payment**
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/verify-payment` - Verify Stripe payment

### Server Actions

**Authentication** (`src/actions/server/auth.js`)
- `postUser()` - Register new user
- `loginUser()` - Validate credentials

**Cart** (`src/actions/server/cart.js`)
- `handleCart()` - Add to cart
- `getCart()` - Fetch cart items
- `increaseItemDb()` / `decreaseItemDb()` - Update quantity
- `deleteItemsFromCart()` - Remove item
- `clearCart()` - Empty cart

**Orders** (`src/actions/server/order.js`)
- `createOrder()` - Create order and send emails
- `updateOrderStatus()` - Update status with notification
- `getOrders()` - Fetch user orders
- `cancelOrder()` - Cancel order

**Products** (`src/actions/server/Product.js`)
- `getProducts()` - Fetch paginated products
- `getSingleProduct()` - Fetch product by ID
- `getBestSellers()` - Top selling products
- `getNewArrivals()` - Latest products
- `getProductsByCategory()` - Filter by category

---

## 💳 Payment Integration

### Stripe Checkout Flow

1. User selects Stripe payment on checkout
2. Frontend calls `/api/create-checkout-session`
3. Server creates Stripe Checkout Session
4. User redirects to Stripe hosted checkout
5. User completes payment
6. Stripe redirects to success page
7. Frontend calls `/api/verify-payment`
8. Server verifies payment and creates order
9. Server sends confirmation emails
10. Cart cleared automatically

### Cash on Delivery (COD)

1. User selects COD on checkout
2. Frontend calls `createOrder()` server action
3. Order created with `paymentStatus: "pending"`
4. Confirmation emails sent
5. Cart cleared
6. Success message displayed

---

## 📧 Email System

### Email Types

1. **Welcome Email** - On user registration
2. **Order Confirmation** - Beautiful HTML invoice with order details
3. **Admin Order Notification** - Detailed order alert for processing
4. **Order Status Update** - Automated emails on status changes
5. **Order Cancellation** - Confirmation of cancellation

### Email Features

- Professional HTML templates with responsive design
- Brand colors and gradients
- Order details with itemized list
- Pricing breakdown
- Shipping information
- Trust badges and icons

### Configuration

Uses **Nodemailer** with Gmail SMTP:
- Host: `smtp.gmail.com`
- Port: `587`
- Security: `STARTTLS`
- Authentication: Gmail app password

---

## 🤝 Contributing

Contributions are welcome! This is an open-source project.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Test all changes thoroughly
- Update documentation if needed
- Provide clear commit messages
- **Give proper credit to the original creator**

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Testing
- 🌐 Internationalization
- ♿ Accessibility improvements

---

## 📄 License

This project is **open-source** and available for viewing and exploration.

### Usage Terms

- ✅ Anyone can view and explore the project
- ✅ Open-source contributions are allowed
- ✅ Can be used for learning and educational purposes
- ⚠️ **Proper credit must be given to the original creator**
- ⚠️ Commercial use requires permission from the creator

### Attribution

When using or referencing this project, please provide credit:

```
Orvella E-commerce Platform
Created by: Siratim Mustakim Chowdhury
GitHub: https://github.com/SiratimMChy/orvella
```

---

## 📧 Contact

**Project Creator**: Siratim Mustakim Chowdhury

- 📧 **Email**: [chowdhurysiratimmustakim@gmail.com](mailto:chowdhurysiratimmustakim@gmail.com)
- 🐙 **GitHub**: [@SiratimMChy](https://github.com/SiratimMChy)
- 💼 **LinkedIn**: [Siratim Mustakim Chowdhury](https://www.linkedin.com/in/siratim-mustakim-chowdhury/)
- 🌐 **Live Demo**: [https://orvella-zeta.vercel.app](https://orvella-zeta.vercel.app)

### Support

For questions, issues, or feature requests:

1. **Check Existing Issues**: Browse the [Issues](https://github.com/SiratimMChy/orvella/issues) page
2. **Create New Issue**: Open a new issue with detailed information
3. **Email Support**: Contact via email for urgent matters

---

## 🙏 Acknowledgments

### Technologies

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://react.dev/) - JavaScript library for UI
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Stripe](https://stripe.com/) - Payment processing
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [DaisyUI](https://daisyui.com/) - Component library
- [Nodemailer](https://nodemailer.com/) - Email sending
- [Vercel](https://vercel.com/) - Deployment platform

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB University](https://university.mongodb.com/)
- [Stripe Documentation](https://stripe.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 📊 Project Statistics

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js + Google OAuth
- **Payment**: Stripe
- **Styling**: TailwindCSS 4 + DaisyUI
- **Components**: 30+
- **Server Actions**: 20+
- **API Routes**: 3
- **Collections**: 5
- **Categories**: 3 (Men, Women, Kids)
- **Payment Methods**: 2 (COD + Stripe)
- **Order Statuses**: 5
- **Email Templates**: 5
- **Responsive**: ✅ Mobile, Tablet, Desktop
- **SEO Optimized**: ✅ Yes
- **Production Ready**: ✅ Yes

---

## 🚀 Version History

### v1.0.0 (Current) - Initial Release

**Features:**
- Complete e-commerce functionality
- User authentication (Email/Password + Google OAuth)
- Product catalog with categories
- Shopping cart with persistence
- Multi-step checkout process
- Dual payment options (COD + Stripe)
- Order management system
- Admin dashboard
- Email notification system
- Responsive design
- SEO optimization
- Role-based access control

---

## 🎯 Future Roadmap

### Planned Features

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Discount/coupon system
- [ ] Multi-currency support
- [ ] Multi-language support
- [ ] Live chat support
- [ ] Order tracking with map
- [ ] Mobile app (React Native)

---

<div align="center">

## ⭐ If you find this project helpful, please give it a star!

**Built with ❤️ using Next.js 16 by Siratim Mustakim Chowdhury**

**Next.js • React • MongoDB • Stripe • NextAuth.js • TailwindCSS**

[View Live Demo](https://orvella-zeta.vercel.app) | [Report Bug](https://github.com/SiratimMChy/orvella/issues) | [Request Feature](https://github.com/SiratimMChy/orvella/issues)

---

### 🚀 Made with Next.js 16 App Router

**© 2024 Siratim Mustakim Chowdhury. Open-source with proper attribution required.**

</div>
