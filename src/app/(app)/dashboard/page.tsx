'use client'

import { LoaderIcon, MenuSquareIcon, SendIcon } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Admin } from '@/model/Admin'
import { toast } from '@/components/ui/use-toast'
import ImageComponent from '@/components/dashboard-components/ImageComponent'
import AboutCardComponent from '@/components/dashboard-components/AboutCardComponent'
import ContactCard from '@/components/dashboard-components/ContactCard'
import axios, { AxiosError } from 'axios'
import SkillCertificateCountCard from '@/components/dashboard-components/SkillCertificateCountCard'
import SkillCard from '@/components/dashboard-components/SkillCard'
import ProjectCountCard from '@/components/dashboard-components/ProjectCountCard'
import { ApiResponse } from '@/types/ApiResponse'



const DashBoard = () => {
  const [user, setUser] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(
    async () => {
      setIsLoading(true);

      try {
        const response = await axios.get<ApiResponse | any>('/api/info');
        const data = response.data;

        if (response.status === 200 && data.success) {
          setUser(data.user)
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: 'Error',
          description:
            axiosError.response?.data.message ?? 'Failed to fetch messages',
          variant: 'destructive',
        });
      }
      finally{
        setIsLoading(false);
      }
    }, [setIsLoading, setUser, toast]
  )

  useEffect(()=>{
    fetchUser()
  }, [toast, fetchUser])

  return  isLoading ? (
    <div className="flex justify-center items-center h-screen" >
      <LoaderIcon className='w-10 h-10 text-white animate-spin' />
      <h1 className='text-xl text-white'>Loading</h1>
    </div >
  ) :(
      <section className='text-white p-1'>
        <div className='flex justify-start items-center space-x-2 bg-blue-800 px-3 py-2'>
          <MenuSquareIcon className='w-8 h-8' />
          <h1 className='text-3xl md:text-4xl'>Dashboard</h1>
          <SendIcon />
        </div>

        <div className='grid sm:grid-cols-3 gap-2 container bg-gray-950 p-1 md:p-4 rounded-xl mt-2'>
          <ImageComponent user={user} />
          <AboutCardComponent bio={`${user?.bio}`} />
          <SkillCertificateCountCard count={user?.certificates.length || 0} />
          <ProjectCountCard count={user?.projects.length || 0} />
        </div>

        <div className=' container  bg-gray-950 p-1 md:p-4 rounded-xl mt-2 space-y-4'>
          <ContactCard email={`${user?.email}`} phone={`${user?.phone}`} city={`${user?.city}`} country={`${user?.country}`} />

          <SkillCard user={user ? user : null} />
        </div>
      </section >
    )

}


export default DashBoard
