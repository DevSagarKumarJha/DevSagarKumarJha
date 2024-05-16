'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { socialsFormSchema } from '@/schemas/socialFormSchema'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

const AddSocialMediaForm = () => {

  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof socialsFormSchema>>({
    resolver: zodResolver(socialsFormSchema),
    defaultValues: {
      name: '',
      url: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof socialsFormSchema>) => {
    setLoading(true)
    try {
      const response = await axios.post<ApiResponse>('/api/social-media', { ...data });
      toast({
        title: response.data.message,
      })
      router.push('/dashboard')
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder='Ex: Github' className='text-black' {...field} />
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
              <FormLabel>Link*</FormLabel>
              <FormControl>
                <Input placeholder='Ex: www.github.com/user-name' className='text-black' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant={'default'} className='w-full text-xl bg-white text-black hover:bg-black hover:text-white hover:border' >{loading? 'loading': 'add'}</Button>
      </form>
    </Form>
  )
}

export default AddSocialMediaForm