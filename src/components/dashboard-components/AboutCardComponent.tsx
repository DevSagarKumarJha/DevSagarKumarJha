import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { InfoIcon } from 'lucide-react';

interface AboutCardComponentProps {
    bio: string;
}

const AboutCardComponent:React.FC<AboutCardComponentProps> = ({bio}) => {
    return (
        <Card className='max-md:mt-2 w-full bg-gray-900 hover:bg-gray-800 border-gray-700 md:col-span-2'>
            <CardHeader>
                <CardTitle className='text-white flex justify-start items-center'>About <InfoIcon className='w-6 h-6 ml-2' /></CardTitle>
            </CardHeader>
            <Separator className='bg-gray-700' />
            <CardContent className='text-gray-300 p-6 py-2'>
                {bio}
            </CardContent>
            <CardFooter>
                <Button className='bg-blue-700'>Update Bio</Button>
            </CardFooter>
        </Card>
    )
}

export default AboutCardComponent