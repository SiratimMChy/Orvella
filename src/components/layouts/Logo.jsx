import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <div>
           <Link href={'/'} className='items-left flex'>
                <Image 
                    src={"/assets/orvella1.jpg"} 
                    alt="Logo" 
                    width={120} 
                    height={120}
                    loading="eager"
                    priority
                    style={{ width: 'auto', height: 'auto' }}
                />
            </Link>
        </div>
    );
};

export default Logo;