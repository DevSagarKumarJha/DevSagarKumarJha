import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface ProjectCountProps {
    count: number | 0;
}

const ProjectCountCard: React.FC<ProjectCountProps> = (
    { count }
) => {
    const router = useRouter();
    return (

        <Card className='max-md:mt-2 w-full hover:bg-gray-800 bg-gray-900 py-2 border-gray-700 col-span-1 text-white'>
            <CardHeader>
                <CardTitle>
                    Projects
                </CardTitle>
                <Separator className='bg-gray-700' />

            </CardHeader>

            <CardContent className='flex justify-center items-center w-full h-1/2 p-6  text-6xl'>
                {count}
            </CardContent>
            <CardFooter>
                <Button onClick={()=>router.push('/dashboard/work')} className='bg-blue-700'>View Projects</Button>
            </CardFooter>

        </Card>
    )
}

export default ProjectCountCard