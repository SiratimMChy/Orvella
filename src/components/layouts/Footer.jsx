import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
    return <div>
        <div className="footer sm:footer-horizontal font-semibold p-6 lg:p-10">
            <div className="flex flex-col items-start">
                <Logo />
                <div className="mt-4 max-w-sm">
                    <p className="text-sm text-gray-600">
                        Orvella offers premium quality clothing for men, women, and kids. 
                        Discover our latest collections and find your perfect style.
                    </p>
                </div>
            </div>
            <nav>
                <h6 className="footer-title">Shop</h6>
                <Link href="/men" className="link link-hover">Men</Link>
                <Link href="/ladies" className="link link-hover">Ladies</Link>
                <Link href="/kids" className="link link-hover">Kids</Link>
                <Link href="/products" className="link link-hover">All Products</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <Link href="/about" className="link link-hover">About Us</Link>
                <Link href="/contact" className="link link-hover">Contact</Link>
                <Link href="/why-choose-us" className="link link-hover">Why Choose Us</Link>
                <Link href="/faq" className="link link-hover">FAQ</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Account</h6>
                <Link href="/login" className="link link-hover">Login</Link>
                <Link href="/register" className="link link-hover">Register</Link>
                <Link href="/my-orders" className="link link-hover">My Orders</Link>
                <Link href="/cart" className="link link-hover">Cart</Link>
            </nav>
        </div>
    </div>;
};

export default Footer;