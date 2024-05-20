"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Project } from '@/model/Admin';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ExpandIcon, LoaderIcon } from 'lucide-react';

import Link from 'next/link';


const ProjectPage = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const router = useRouter()
    const fetchProjects = useCallback(
        async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<ApiResponse | any>('/api/info');
                const data = response.data;

                if (response.status === 200 && data.success) {
                    setProjects(data.user.projects)
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                toast({
                    title: 'Error',
                    description:
                        axiosError.response?.data.message ?? 'Failed to fetch messages',
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setProjects, toast]
    )




    useEffect(() => {
        fetchProjects()
    }, [toast, fetchProjects])


    projects.map((project) => {
        console.log(project)
    })
    return (
        <section className='text-white space-y-2'>
            <Card className='w-full bg-gray-900 py-2 rounded-none border-gray-700 text-white'>
                <CardHeader >
                    <div className='flex justify-between items-center'>
                        <CardTitle>Projects</CardTitle>

                        <Button
                            onClick={() => router.push('./works/add')}
                            className='bg-blue-700' >Add project</Button>
                    </div>
                </CardHeader>
                <Separator className='bg-gray-700' />

                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <LoaderIcon className='w-10 h-10 text-white animate-spin' />
                            <h1 className='text-xl text-white'>Loading</h1>
                        </div>
                    ) :
                        (
                            <CardContent className='md:p-6 container flex w-full max-md:min-h-screen justify-center items-start md:items-center'>
                                {
                                    projects.length === 0 ? (
                                        <div className="flex min-h-screen w-full justify-center items-center">
                                            <h1 className='text-lg'>No works Found </h1>
                                        </div>
                                    ) : (
                                        <Carousel
                                            className="w-full mt-4">
                                            <CarouselContent
                                                className='ml-4 gap-2 max-w-sm md:max-w-md'
                                            >
                                                {projects.map((work) => (
                                                    <CarouselItem
                                                        className="cursor-pointer rounded-xl border p-3 space-y-4 w-full"
                                                        key={work._id}>
                                                        <div className="aspect-square  rounded-xl bg-gray-900 relative ">
                                                            <Image
                                                                src={work.images[0]}
                                                                fill
                                                                alt={work.title}
                                                                className='aspect-square object-cover rounded-md' />
                                                        </div>
                                                        <div className='flex justify-between items-center'>
                                                            <p className="font-semibold text-lg">{work.title}</p>
                                                            <Link className='p-2 bg-black rounded' href={work.url}><ExpandIcon/></Link>
                                                        </div>
                                                    </CarouselItem>

                                                ))
                                                }
                                                
                                            </CarouselContent>
                                            {
                                                    projects.length > 1 ? (
                                                        <div className='max-md:hidden'>
                                                            <CarouselPrevious className='text-black ' />
                                                            <CarouselNext className='text-black' />
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )
                                                }

                                        </Carousel>
                                    )
                                }
                            </CardContent>
                        )
                }
            </Card>


        </section>
    )
}

export default ProjectPage