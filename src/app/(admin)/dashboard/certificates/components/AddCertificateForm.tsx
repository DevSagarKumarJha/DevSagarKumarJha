"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { AddCertificateFormSchema } from '@/schemas/AddCertificateFormSchema'
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

const CertificateForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof AddCertificateFormSchema>>({
        resolver: zodResolver(AddCertificateFormSchema),
        defaultValues: {
            title: '',
            issuingOrganization: '',
            credentialId: '',
            img: '',
            credentialUrl: '',
            issueDate: new Date,
            expiryDate: null,
            createdAt: new Date
        }
    })

    const onSubmit = async (data: z.infer<typeof AddCertificateFormSchema>) => {
        setLoading(true);
        try {
            const response = await axios.post<ApiResponse>('/api/skill-certificates', {...data});
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
        variant: 'destructive',
      });
        }finally{
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
                                <Input placeholder='Ex: HackerRank Certified Java Basic' className='text-black' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='issuingOrganization'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Issuing Organization*</FormLabel>
                            <FormControl>
                                <Input placeholder='Ex: HackerRank' className='text-black' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='credentialId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Credential Id*</FormLabel>
                            <FormControl>
                                <Input placeholder='Ex: 655c37587329' className='text-black' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="img"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
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
                <FormField
                    control={form.control}
                    name='credentialUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Credential Url*</FormLabel>
                            <FormControl>
                                <Input placeholder='https://www.hackerrank.com/certificates/655c37587329' className='text-black' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="issueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Issue Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal text-black",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value || new Date}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date("2100-31-12") || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Expiry Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal text-black",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date("2100-31-12") || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type='submit' variant={'default'} className='w-full text-xl bg-white text-black hover:bg-black hover:text-white hover:border' >Add</Button>
            </form>
        </Form>
    )
}

export default CertificateForm