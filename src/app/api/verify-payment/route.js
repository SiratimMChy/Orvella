import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { dbConnect, collections } from '@/lib/dbConnect';
import { sendEmail } from '@/lib/sendEmail';
import { orderInvoiceTemplate } from '@/lib/orderInvoice';
import { adminOrderNotificationTemplate } from '@/lib/AdminInvoice';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get user session
    const userSession = await getServerSession(authOptions);
    
    // Connect to database collections
    const paymentsCollection = dbConnect('payments');
    const ordersCollection = dbConnect(collections.ORDER);

    // Check if payment already processed
    const existingPayment = await paymentsCollection.findOne({
      transactionId: session.payment_intent,
    });

    if (existingPayment) {
      return NextResponse.json({
        message: 'Payment already processed',
        data: existingPayment,
      });
    }

    // Parse order items and shipping details from metadata
    const orderItems = JSON.parse(session.metadata.orderItems);
    const shippingDetails = JSON.parse(session.metadata.shippingDetails || '{}');

    // Create payment record
    const paymentInfo = {
      customerName: session.metadata.customerName,
      customerEmail: session.customer_email,
      amount: session.amount_total / 100,
      currency: session.currency.toUpperCase(),
      transactionId: session.payment_intent,
      paymentStatus: session.payment_status,
      paidAt: new Date(),
      sessionId: session.id,
    };

    const paymentResult = await paymentsCollection.insertOne(paymentInfo);

    // Create order record with shipping details
    const orderInfo = {
      userId: userSession?.user?.email || session.customer_email,
      userEmail: session.customer_email,
      userName: session.metadata.customerName,
      firstName: shippingDetails.firstName || '',
      lastName: shippingDetails.lastName || '',
      email: session.customer_email,
      phone: shippingDetails.phone || '',
      address: shippingDetails.address || '',
      city: shippingDetails.city || '',
      postalCode: shippingDetails.postalCode || '',
      specialInstructions: shippingDetails.specialInstructions || '',
      items: orderItems,
      totalPrice: session.amount_total / 100,
      paymentMethod: 'stripe',
      paymentStatus: 'paid',
      transactionId: session.payment_intent,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const orderResult = await ordersCollection.insertOne(orderInfo);

    // Send confirmation emails
    try {
      // Customer email
      await sendEmail({
        to: session.customer_email,
        subject: '🎉 Payment Successful - Order Confirmed',
        html: orderInvoiceTemplate({
          orderId: orderResult.insertedId.toString(),
          items: orderItems,
          totalPrice: session.amount_total / 100,
          customerName: session.metadata.customerName,
          customerEmail: session.customer_email,
          shippingAddress: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.postalCode}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ','),
          phone: shippingDetails.phone,
        }),
      });

      // Admin email
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: '🔥 New Stripe Order - Payment Confirmed',
        html: adminOrderNotificationTemplate({
          orderId: orderResult.insertedId.toString(),
          items: orderItems,
          totalPrice: session.amount_total / 100,
          address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.postalCode}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ','),
          contact: shippingDetails.phone,
          name: session.metadata.customerName,
          email: session.customer_email,
          instruction: shippingDetails.specialInstructions || '',
        }),
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: paymentResult.insertedId,
      orderId: orderResult.insertedId,
      transactionId: session.payment_intent,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment', details: error.message },
      { status: 500 }
    );
  }
}
