import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import AddSocialMediaForm from '../HelpingComponents/AddSocialMediaForm';
import { Admin } from '@/model/Admin';
import { X } from 'lucide-react';
import Link from 'next/link';

interface SocialMediaProps {
    user: Admin | null
}

const SocialMediaCard: React.FC<SocialMediaProps> = (
    { user = null }
) => {
    const router = useRouter();
    return (

        <Card className='max-md:mt-2 w-full hover:bg-gray-800 bg-gray-900 py-2 border-gray-700 col-span-1 text-white'>
            <CardHeader>
                <CardTitle>
                    Connect with me
                </CardTitle>
                <Separator className='bg-gray-700' />

            </CardHeader>

            <CardContent className='grid p-6 grid-cols-2 gap-x-4 gap-2'>
                {
                    user?.socials.map((link)=>(
                        <Link className='border rounded-md p-1 text-center hover:bg-black' target='blank' href={link.url}>{link.name}</Link>
                    ))
                }
            </CardContent>
            <CardFooter>
                <AlertDialog>
                    <AlertDialogTrigger className='bg-blue-700 p-2 rounded-md text-white'>Add Link</AlertDialogTrigger>
                    <AlertDialogContent className='bg-gray-900 text-white'>
                        <AlertDialogHeader>
                            <div className="flex justify-between items-center">
                                <AlertDialogTitle>Add Link</AlertDialogTitle>

                                <AlertDialogCancel className='bg-red-600'>
                                    <X/>
                                </AlertDialogCancel>
                            </div>
                        </AlertDialogHeader>
                        <AddSocialMediaForm />
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>

        </Card>
    )
}

export default SocialMediaCard