"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Certificate } from '@/model/Admin';
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
import { LoaderIcon } from 'lucide-react';


const CertificatePage = () => {

    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter()
    const fetchCertificates = useCallback(
        async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<ApiResponse | any>('/api/info');
                const data = response.data;

                if (response.status === 200 && data.success) {
                    setCertificates(data.user.certificates)
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
        [setIsLoading, setCertificates, toast]
    )

    useEffect(() => {
        fetchCertificates()
    }, [toast, fetchCertificates])


    certificates.map((certificate) => {
        console.log(certificate)
    })
    return (
        <section className='text-white space-y-2'>
            <Card className='max-md:mt-2 w-full bg-gray-900 py-2 border-gray-700 text-white'>
                <CardHeader >
                    <div className='flex justify-between items-center'>
                        <CardTitle>Certificates</CardTitle>

                        <Button
                            onClick={() => router.push('./certificates/add')}
                            className='bg-blue-700' >Add Certificates</Button>
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
                        certificates.length === 0 ? (
                            <div className="flex min-h-screen w-full justify-center items-center">
                                <h1 className='text-lg'>No Certificates Found </h1>
                            </div>
                        ) : (
                            <Carousel opts={{
                                align: "start",
                            }}
                                className="w-full md:container">
                                <CarouselContent>
                                    {certificates.map((certificate) => (
                                        <CarouselItem className="basis-full" key={certificate._id}>
                                            <Card className='flex w-full min-h-[60vh] items-center bg-gray-900 text-white py-2 px-5'>
                                                <div className='grid md:grid-cols-4'>
                                                    <div className='md:col-span-2'>
                                                        <Image height={500} width={500} className='rounded-lg' src={certificate.img} alt='certificate' />
                                                    </div>
                                                    <div className='md:col-span-2'>
                                                        <CardHeader>
                                                            <CardTitle className='text-2xl'>{certificate.title}</CardTitle>
                                                        </CardHeader>
                                                        <CardContent >
                                                            <p className='flex gap-2 justify-normal items-center text-lg '><b>Issued By:</b> {certificate.issuingOrganization}</p>
                                                            <p className='flex gap-2 justify-normal items-center text-lg '><b >Credential Id:</b> {certificate.credentialId}</p>
                                                            <p className='flex gap-2 justify-normal items-center text-lg '><b>Issued On:</b> {dayjs(certificate.issueDate).format('MMM D, YYYY')}</p>
                                                            <p className='flex gap-2 justify-normal items-center text-lg '><b>Valid upto:</b> {certificate.expiryDate === null ? "Life time" : dayjs(certificate.expiryDate).format('MMM D, YYYY')}</p>


                                                        </CardContent>
                                                        <CardFooter>

                                                            <Link className='rounded-md bg-blue-700 px-3 py-2 mt-5 ' href={certificate.credentialUrl}>View Certificate</Link>
                                                        </CardFooter>
                                                    </div>
                                                </div>
                                            </Card>
                                        </CarouselItem>
                                    ))
                                    }
                                </CarouselContent>
                                {
                                    certificates.length > 1 ? (
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

export default CertificatePage