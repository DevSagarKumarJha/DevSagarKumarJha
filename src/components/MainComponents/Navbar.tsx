"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { MenuIcon, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <nav className='bg-gray-800 text-white p-4 sm:p-6 md:flex md:justify-between md:items-center w-full'>
            <div className="container mx-auto flex justify-between items-center">
                <Link href="" className='text-2xl font-bold'>Sagar</Link>
                
                <div className={` ${isOpen? " bg-gray-800 absolute max-md:min-h-screen flex-col flex gap-10 p-4 w-full left-0 top-16 " : "hidden"} md:space-x-4  md:flex md:w-fit  md:flex-row md:static`}>
                    <Link href="/" className='hover:text-gray-400 hover:border-b-8 active:border-b-8  duration-300'>
                        Home
                    </Link>
                    <Link href="/work" className='hover:text-gray-400 hover:border-b-8 active:border-b-8  duration-300'>
                        Work
                    </Link>
                    <Link href="/certificate" className='hover:text-gray-400 hover:border-b-8 active:border-b-8  duration-300'>
                        Certificate
                    </Link>
                    <Link href="/about" className='hover:text-gray-400 hover:border-b-8 active:border-b-8  duration-300'>
                        About
                    </Link>
                    <Link href="/contact" className='hover:text-gray-400 hover:border-b-8 active:border-b-8  duration-300'>
                        Contact
                    </Link>
                </div>

                <div className="md:hidden flex items-center">
                    <Button className='bg-transparent border-2 text-white px-2 py-1 ease-in-out duration-150' onClick={()=>setIsOpen(!isOpen)}> {isOpen? (<X/>):(<MenuIcon/>)} </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar