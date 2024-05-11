'use client'

import { ArrowBigLeftDashIcon, ArrowRightIcon, Contact2Icon, ImagePlus, InfoIcon, LoaderIcon, LocateIcon, MailIcon, MenuSquareIcon, PhoneIcon, SendIcon, Settings2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Admin } from '@/model/Admin'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { skillSchema } from '@/schemas/skillSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import ImageComponent from '@/components/dashboard-components/ImageComponent'
import AboutCardComponent from '@/components/dashboard-components/AboutCardComponent'
import ContactCard from '@/components/dashboard-components/ContactCard'
import axios, { AxiosError } from 'axios'
import SkillCard from '@/components/dashboard-components/SkillCard'


const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Admin | null>(null);
  

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className='w-10 h-10 text-white animate-spin' />
        <h1 className='text-xl text-white'>Loading</h1>
      </div>
    )
  } else {

    return (
      <section className='text-white p-1'>
        <div className='flex justify-start items-center space-x-2 bg-blue-800 px-3 py-2'>
          <MenuSquareIcon className='w-8 h-8' />
          <h1 className='text-3xl md:text-4xl'>Dashboard</h1>
          <SendIcon />
        </div>

        <div className='grid sm:grid-cols-3 gap-2 container bg-gray-950 p-1 md:p-4 rounded-xl mt-2'>
          <ImageComponent user={user} />

          <AboutCardComponent bio={`${user?.bio}`} />
        </div>

        <div className=' container  bg-gray-950 p-1 md:p-4 rounded-xl mt-2 space-y-4'>
        <ContactCard email={`${user?.email}`} phone={`${user?.phone}`} city={`${user?.city}`} country={`${user?.country}`} />

        <SkillCard user={user? user : null} />

        </div>
      </section >
    )
  }
}

export default DashBoard
