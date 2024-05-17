import { CopyrightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const Footer = () => {
    return (
        <footer className='flex justify-center w-full items-center text-white bg-gradient-to-br p-6 from-blue-400 to-blue-700'>
            <div className="flex justify-center items-center gap-2">
                <CopyrightIcon className='md:w-6 md:h-6' />
                <h1 className="text-lg">sagarkumarjha.com</h1>
                <h2 className='text-md'>2024</h2>

            </div>
        </footer>
    )
}
