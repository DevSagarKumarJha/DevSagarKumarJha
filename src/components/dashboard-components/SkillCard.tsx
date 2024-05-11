'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { skillSchema } from '@/schemas/skillSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from '../ui/use-toast'
import { Separator } from '../ui/separator'
import { Settings2Icon } from 'lucide-react'
import { Admin } from '@/model/Admin'

interface SkillCardProps{
    user: Admin | null;
}
const SkillCard:React.FC<SkillCardProps> = ({user=null}) => {

    const router = useRouter();

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema)
  });


  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof skillSchema>) => {
    setLoading(true)
    try {
      const response = await axios.post<ApiResponse>('api/skills', { ...data });

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
    <Card className='max-md:mt-2 w-full hover:bg-gray-800 bg-gray-900 border-gray-700 col-span-3'>
          <CardHeader>
            <CardTitle className='text-white flex justify-start items-center'>Skills <Settings2Icon className='w-6 h-6 ml-2' /> </CardTitle>
          </CardHeader>
          <Separator className='bg-gray-700' />

          <CardContent className='p-6'>
            <ul className='grid grid-cols-2'>
              {

                user?.skills.sort().map((skill, index) => (

                  <li className='text-gray-400 py-3 px-4' key={index}>
                    {skill}
                    <Separator className='bg-gray-700' />
                  </li>

                ))
              }
            </ul>
          </CardContent>
          <Separator className='bg-gray-700' />
          <CardFooter className='p-3'>
            <AlertDialog>
              <AlertDialogTrigger className='bg-blue-700 p-2 rounded-md text-white'>Add skill</AlertDialogTrigger>
              <AlertDialogContent className='bg-gray-900 text-white'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Add Skill</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="skill"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className='text-input' placeholder="Skill Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AlertDialogFooter>
                      <Button type="submit" className='bg-blue-700 hover:bg-blue-600'>Add</Button>
                      <AlertDialogCancel className='bg-black'>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
  )
}

export default SkillCard