import Link from 'next/link';
import React from 'react';
import { BiSolidError } from "react-icons/bi";
const Error404 = () => {
    return <div className='flex flex-col min-h-screen justify-center items-center gap-4'>
         <BiSolidError size={140} className='text-primary' />
            <h1 className='text-4xl font-bold mt-4'>404 - Page Not Found</h1>
            <p className='mt-2 text-lg'>The page you are looking for does not exist.</p>
            <Link href={'/'} className='btn btn-primary text-white'>Go to Home</Link>
        </div>
};

export default Error404;