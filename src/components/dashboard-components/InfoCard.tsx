'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Loader2, PenIcon, UserPlus2Icon } from 'lucide-react'
import axios from 'axios';
import { Admin } from '@/model/Admin';
import { Separator } from '../ui/separator'

function InfoCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Admin | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/info');
        const data = response.data;

        if (response.status === 200 && data.success) {
          // Data fetched successfully
          setUser(data.user);
        } else {
          // Error handling
          console.error('Error:', data.message);
        }
      } catch (error: any) {
        // Network error or other errors
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <Loader2 className="h-10 w-10 text-white animate-spin" />
    )
  }
  else {
    return (
      <Card className='bg-gray-900 text-white border-red-400'>
        <div className="flex p-6 w-full justify-center md:justify-normal md:items-start items-center">
          <Link href={""} className="border-8 rounded-full border-red-400 bg-gray-900 p-5  md:w-fit ">
            {
              user && user.imgurl ? (
                <img className='object-fit' src={user.imgurl} alt="" />
              ) : (
                <UserPlus2Icon className='w-200 text-red-400' size={70} />
              )
            }
          </Link>

        </div>
        <CardHeader>
          <div className="flex justify-between items-center space-x-4">
            <CardTitle className='text-red-400'>About Me</CardTitle>
            <Link href={"#"}><PenIcon /></Link>
          </div>
        </CardHeader>
        <Separator className='bg-red-400' />
        <CardHeader>
          <CardTitle className='text-xl text-red-400'>{user?.name}</CardTitle>
          <CardDescription className='text-white md:text-lg ' >
            {user?.bio}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }
}

export default InfoCard