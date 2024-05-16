"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Project } from '@/model/Admin';
import { ApiResponse } from '@/types/ApiResponse';
import dayjs from "dayjs"
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
import Link from 'next/link';
import { format, formatDate } from 'date-fns';
import { LoaderIcon } from 'lucide-react';


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
            <Card className='max-md:mt-2 w-full bg-gray-900 py-2 border-gray-700 text-white'>
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
                        <CardContent className='md:p-6 container flex w-full min-h-screen justify-center items-center'>
                    {
                        projects.length === 0 ? (
                            <div className="flex min-h-screen w-full justify-center items-center">
                                <h1 className='text-lg'>No works Found </h1>
                            </div>
                        ) : (
                            <Carousel opts={{
                                align: "start",
                            }}
                                className="w-full md:container">
                                <CarouselContent>
                                    {projects.map((work) => (
                                        <CarouselItem className="basis-full" key={work._id}>
                                            <Card className='flex w-full min-h-[60vh] items-center bg-gray-900 text-white py-2 px-5'>
                                                
                                            </Card>
                                        </CarouselItem>
                                    ))
                                    }
                                </CarouselContent>
                                {
                                    projects.length > 1 ? (
                                        <>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </>
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