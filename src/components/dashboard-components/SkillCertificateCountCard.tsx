import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface CertificateCountProps {
    count: number | 0;
}

const SkillCertificateCountCard: React.FC<CertificateCountProps> = (
    { count }
) => {
    const router = useRouter();
    return (

        <Card className='max-md:mt-2 w-full hover:bg-gray-800 bg-gray-900 py-2 border-gray-700 col-span-1 text-white'>
            <CardHeader>
                <CardTitle>
                    Certificates
                </CardTitle>
                <Separator className='bg-gray-700' />

            </CardHeader>

            <CardContent className='flex justify-center items-center w-full h-1/2 p-6  text-6xl'>
                {count}
            </CardContent>
            <CardFooter>
                <Button onClick={()=>router.push('/dashboard/certificates')} className='bg-blue-700'>View Certificates</Button>
            </CardFooter>

        </Card>
    )
}

export default SkillCertificateCountCard