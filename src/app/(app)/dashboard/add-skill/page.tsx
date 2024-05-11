"use client";
import { skillSchema } from '@/schemas/skillSchema'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const page = () => {
    const form = useForm<z.infer<typeof skillSchema>>({
        resolver: zodResolver(skillSchema)
    });

    const router = useRouter()

    const skill = form.watch('skill')

    const [loading , setLoading] = useState(false)

    const onSubmit = async (data: z.infer<typeof skillSchema>) => {
        setLoading(true)
        try {
            const response = await axios.post<ApiResponse>('api/skills', {...data});

            toast({
                title: response.data.message,
                variant: 'default',
              });
              form.reset({ ...form.getValues(), skill: '' })
            
              router.push('../dashboard');

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
              title: 'Error',
              description:
                axiosError.response?.data.message ?? 'Failed to sent message',
              variant: 'destructive',
            });
          } finally {
            setLoading(false);
          }
    }
  return (
    <section className='container bg-gray-950 min-h-screen'>

    </section>
  )
}

export default page