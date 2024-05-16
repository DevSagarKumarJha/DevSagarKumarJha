import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Contact2Icon, LocateIcon, MailIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
interface ContactCardProps {
    email: string;
    phone: string;
    city: string;
    country: string
}

const ContactCard: React.FC<ContactCardProps> = ({
    email,
    phone,
    city,
    country

}) => {
    return (
        <Card className='max-md:mt-2 bg-gray-900 hover:bg-gray-800 border-gray-700 text-wrap'>
            <CardHeader>
                <CardTitle className='text-white flex justify-start items-center'>Contact Information <Contact2Icon className='w-6 h-6 ml-2' /></CardTitle>
            </CardHeader>
            <Separator className='bg-gray-700' />
            <CardContent
                className='text-gray-300 p-2 md:p-6 hover:bg-black'>
                <b className='flex justify-start text-white items-center'>
                    <MailIcon className='mr-2' /> Email
                </b>

                <Link className='text-clip' href={`mailto:${email}`} >
                    {email}
                </Link>
            </CardContent>
            <Separator className='bg-gray-700' />

            <CardContent className='text-gray-300 p-2 md:p-6 hover:bg-black'>
                <b className='flex justify-start text-white items-center'>
                    <PhoneIcon className='mr-2' /> Phone
                </b>
                <Link  href={`tel:${phone}`}>
                    {phone}
                </Link>
            </CardContent>
            <Separator className='bg-gray-700' />

            <CardContent className='text-gray-300 p-2 md:p-6 hover:bg-black' >
                <b className='flex justify-start text-white items-center'>
                    <LocateIcon className='mr-2' /> Location
                </b>
                <Link href={`https://www.google.com/maps/search/${city}+${country}`}>
                    {city}, {country}
                </Link>
            </CardContent>
            <Separator className='bg-gray-700' />

        </Card>
    )
}

export default ContactCard