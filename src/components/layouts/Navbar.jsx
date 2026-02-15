"use client";
import React from "react";
import Logo from "./Logo";
import NavLink from "../Links/NavLink";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import AuthButtons from "../Links/AuthButtons";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();

   
    const userRole = session?.user?.role || session?.role;
    const isAdmin = userRole === "admin";

    const nav = <>
        <li>
            <NavLink href={'/'}>Home</NavLink>
        </li>
        <li>
            <NavLink href={'/products'}>Products</NavLink>
        </li>
      
        {status === "loading" ? null : (
            status === "authenticated" && isAdmin ? (
                
                <>
                    <li>
                        <NavLink href={'/orders'}>Orders</NavLink>
                    </li>
                    <li>
                        <NavLink href={'/add-product'}>Add Product</NavLink>
                    </li>
                </>
            ) : (
                
                status === "authenticated" && (
                    <li>
                        <NavLink href={'/my-orders'}>My Orders</NavLink>
                    </li>
                )
            )
        )}
        <li>
            <NavLink href={'/about'}>About</NavLink>
        </li>
        <li>
            <NavLink href={'/contact'}>Contact</NavLink>
        </li>
        <li>
            <NavLink href={'/faq'}>FAQ</NavLink>
        </li>
    </>

    return (
        <div>
            <div className="navbar bg-base-100 py-0 max-h-16">
                <div className="navbar-start">
                    <div className="dropdown relative"> 
                        <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 overflow-hidden rounded-box z-50 mt-3 w-52 p-2 shadow"> {/* changed: higher z-index */}
                            {nav}
                        </ul>
                    </div>

                    <Logo />
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-0">
                        {nav}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    <Link href={"/cart"} className="btn btn-primary">
                        <FiShoppingCart></FiShoppingCart>
                    </Link>
                    <AuthButtons></AuthButtons>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
