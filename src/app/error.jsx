"use client";
import Link from 'next/link';
import React from 'react';
import { BiSolidErrorAlt } from "react-icons/bi";

const error = () => {
    return (
        <div className='flex flex-col min-h-screen justify-center items-center gap-4'>
         <BiSolidErrorAlt size={140} className='text-primary' />
            <h1 className='text-4xl font-bold mt-4'>Something went wrong</h1>
            <p className='mt-2 text-lg'>An unexpected error has occurred.</p>
            <Link href={'/'} className='btn btn-primary text-white'>Go to Home</Link>
        </div>
    );
};

export default error;