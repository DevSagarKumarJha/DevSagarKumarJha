'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ImageUpload from '@/components/ui/image-upload';
import { toast } from '@/components/ui/use-toast';
import { Admin } from '@/model/Admin';
import { uploadProfilePicSchema } from '@/schemas/uploadProfilePicSchema';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod'

const page = () => {
    const [loading, setIsLoading] = useState(false);
    const [user, setUser] = useState<Admin | null>(null);
    const router = useRouter();




    useEffect(() => {
        const fetchdata = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get('../api/info');
                const data = response.data;

                if (response.status === 200 && data.success) {
                    setUser(data.user)
                } else {
                    toast({
                        title: 'Error getting data',
                        description: data.message,
                        variant: "destructive"
                    })
                }
            } catch (error) {
                const axiosErr = error as AxiosError;
                toast({
                    title: 'Internal Server Error',
                    description: axiosErr.message,
                    variant: "destructive"
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchdata()
    }, [])


    const form = useForm<z.infer<typeof uploadProfilePicSchema>>({
        defaultValues: {
            imgurl: user?.imgurl || ""
        }
    })

    const imgurl = form.watch('imgurl');

    const onSubmit = async (data: z.infer<typeof uploadProfilePicSchema>) => {
        try {
            const response = await axios.post<ApiResponse>('../api/update-profile-pic', data)
            toast({
                title: response.data.message,
                variant: 'default',
              });
              form.reset({ ...form.getValues(), imgurl: '' });
              router.push("/dashboard")
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'Error',
                description:
                    axiosError.response?.data.message ?? 'Failed to sent message',
                variant: 'destructive',
            });
        }
    }

    return (
        <section className='text-white'>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 w-full flex justify-center items-center  min-h-screen '>
                    <div className='border border-gray-700 rounded-lg p-6'>
                        <div className="flex flex-col items-center p-10">
                            {user && user.imgurl ? (
                                <Image src={`${user?.imgurl}`} alt={`${user?.name}`} width={150} height={150} className=" mb-3 rounded-full" />
                            ) : (
                                <div className='rounded-full shadow-lg border border-gray-700 p-2 mb-3'>
                                    <ImagePlus className='w-14 h-14' />
                                </div>
                            )

                            }
                        </div>
                        <div className="flex justify-center items-center w-full mb-4">
                            <FormField
                                control={form.control}
                                name="imgurl"
                                render={({ field }) => (
                                    <FormItem>
                                        <ImageUpload
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                            value={field.value ? [field.value] : []}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={loading} className="w-full bg-blue-700" type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default page