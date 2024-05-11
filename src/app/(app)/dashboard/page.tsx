'use client'

import { ArrowBigLeftDashIcon, ArrowRightIcon, Contact2Icon, ImagePlus, InfoIcon, LoaderIcon, LocateIcon, MailIcon, MenuSquareIcon, PhoneIcon, SendIcon, Settings2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Admin } from '@/model/Admin'
import { toast } from '@/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useForm } from 'react-hook-form'
import { skillSchema } from '@/schemas/skillSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'


const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Admin | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema)
  });


  const skill = form.watch('skill')

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


  useEffect(() => {
    const fetchdata = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('api/info');
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

  console.log(user?.name)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className='w-10 h-10 text-white animate-spin' />
        <h1 className='text-xl text-white'>Loading</h1>
      </div>
    )
  } else {

    return (
      <section className='text-white'>
        <div className='flex justify-start items-center space-x-2 bg-blue-800 px-3 py-2'>
          <MenuSquareIcon className='w-8 h-8' />
          <h1 className='text-3xl md:text-4xl'>Dashboard</h1>
          <SendIcon />
        </div>

        <div className='grid sm:grid-cols-3 gap-2 container bg-gray-950 p-4 rounded-xl mt-2'>
          <div className="w-full max-w-sm border rounded-lg shadow bg-gray-900 hover:bg-gray-800 border-gray-700 col-span-1">

            <div className="flex flex-col items-center p-10">
              {user && user.imgurl ? (
                <Image src={`${user?.imgurl}`} alt={`${user?.name}`} width={150} height={150} className=" mb-3 rounded-full" />
              ) : (
                <div className='rounded-full shadow-lg border border-gray-700 p-2 mb-3'>
                  <ImagePlus className='w-14 h-14' />
                </div>
              )

              }
              <h5 className="mb-1 text-xl font-medium text-white">{user?.name}</h5>
              <span className="text-sm text-gray-400">Full Stack developer</span>
              <div className="flex mt-4 md:mt-6">
                <Button className='w-full bg-blue-700' onClick={() => router.push("dashboard/upload-profile-pic")}>
                  {
                    user && user.imgurl ? "Change Photo" : "Upload Photo"
                  }
                </Button>
              </div>
            </div>
          </div>

          <Card className='max-md:mt-2 w-full bg-gray-900 hover:bg-gray-800 border-gray-700 md:col-span-2'>
            <CardHeader>
              <CardTitle className='text-white flex justify-start items-center'>About <InfoIcon className='w-6 h-6 ml-2' /></CardTitle>
            </CardHeader>
            <Separator className='bg-gray-700' />
            <CardContent className='text-gray-300 p-6 py-2'>
              {user?.bio}
            </CardContent>
            <CardFooter>
              <Button className='bg-blue-700'>Update Bio</Button>
            </CardFooter>
          </Card>

          <Card className='max-md:mt-2 bg-gray-900 hover:bg-gray-800 border-gray-700 md:col-span-2'>
            <CardHeader>
              <CardTitle className='text-white flex justify-start items-center'>Contact Information <Contact2Icon className='w-6 h-6 ml-2' /></CardTitle>
            </CardHeader>
            <Separator className='bg-gray-700' />
            <CardContent
              className='text-gray-300 p-6'>
              <b className='flex justify-start text-white items-center'>
                <MailIcon className='mr-2' /> Email
              </b>

              <Link href={`mailto:${user?.email}`}>
                {user?.email}
              </Link>
            </CardContent>
            <Separator className='bg-gray-700' />

            <CardContent className='text-gray-300 p-6'>
              <b className='flex justify-start text-white items-center'>
                <PhoneIcon className='mr-2' /> Phone
              </b>
              <Link href={`tel:${user?.phone}`}>
                {user?.phone}
              </Link>
            </CardContent>
            <Separator className='bg-gray-700' />

            <CardContent className='text-gray-300 p-6' >
              <b className='flex justify-start text-white items-center'>
                <LocateIcon className='mr-2' /> Location
              </b>
              <Link href={`https://www.google.com/maps/search/${user?.city}+${user?.country}`}>
                {user?.city}, {user?.country}
              </Link>
            </CardContent>
            <Separator className='bg-gray-700' />

          </Card>

          <Card className='max-md:mt-2 w-full hover:bg-gray-800 bg-gray-900 border-gray-700 col-span-1'>
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
        </div>
      </section >
    )
  }
}

export default DashBoard
