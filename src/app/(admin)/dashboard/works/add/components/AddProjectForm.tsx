"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import axios, { AxiosError } from 'axios';

import { toast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { projectSchema } from '@/schemas/projectSchema';
import { Textarea } from '@/components/ui/textarea';

const AddProjectForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: '',
            description: '',
            url: '',
            images: [],
            createdAt: new Date(),
        }
    })


    const onSubmit = async (data: z.infer<typeof projectSchema>) => {
        setLoading(true)
        try {
            const response = await axios.post<ApiResponse>("/api/work", { ...data })

            toast({
                title: response.data.message,
            })
            router.push('../')
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'Error',
                description:
                    axiosError.response?.data.message ?? 'Failed to sent message',
                variant: 'destructive',});
            }finally {
                setLoading(false)
            }
        }
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 max-w-md border p-4 my-6 rounded-xl'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name*</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ex: Portfolio Management App' className='text-black' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description*</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Ex: HackerRank' className='text-black' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='url'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL*</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ex: https://example.com' className='text-black' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <ImageUpload
                                    value={field.value.map((image) => image.url)}
                                    disabled={loading}
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) =>
                                        field.onChange([
                                            ...field.value.filter((current) => current.url !== url),
                                        ])}

                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' variant={'default'} className='w-full text-xl bg-white text-black hover:bg-black hover:text-white hover:border' >Add</Button>
                </form>
            </Form>
        )
    }

    export default AddProjectForm