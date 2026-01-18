# Orvella – Premium Fashion E-commerce Platform

Orvella is a modern full-stack e-commerce platform built with Next.js 16, providing a complete shopping and admin management experience.

Live URL=https://orvella-zeta.vercel.app
## Features

* Product browsing by category
* Search and filter functionality
* Shopping cart with real-time updates
* User authentication with NextAuth.js
* Order placement and order history
* Admin dashboard for product and order management
* Fully responsive design

## Tech Stack

* Next.js 16 (App Router)
* Tailwind CSS
* MongoDB
* NextAuth.js (Google OAuth)
* Nodemailer

## Installation

```bash
git clone <repository-url>
cd orvella
npm install
npm run dev
```

Create a `.env.local` file and configure MongoDB, NextAuth, Google OAuth, and email credentials.

## Project Structure

```
src/
app/        # Routes and pages
components/ # UI components
actions/    # Server actions
lib/        # Utilities
```

