'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Admin } from "@/model/Admin";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Code2Icon, CoffeeIcon, Loader, UserRoundIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchUser = useCallback(
    async () => {
      setIsLoading(true);

      try {
        const response = await axios.get<ApiResponse | any>('/api/info/devsagarkumarjha');
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
      finally {
        setIsLoading(false);
      }
    }, [setIsLoading, setUser, toast]
  )

  useEffect(() => {
    fetchUser()
  }, [toast, fetchUser])
  return isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Loader className="animate-spin text-white w-20 h-20" />
    </div>) : (
    <main className="flex flex-col items-center bg-transparent justify-between lg:px-24 px-1">
      <section className="flex flex-col justify-evenly bg-transparent w-full items-center lg:py-5 rounded-md ">
        <div className="flex flex-col-reverse lg:flex-row w-full max-lg:min-h-screen lg:h-[79vh] bg-gradient-to-br from-blue-950 to-purple-700 md:border border-blue-950  md:rounded-md shadow-2xl">
          <h1 className="text-xl flex gap-2 justify-center items-center shadow-lg bg-gradient-to-tr from-purple-800 to-purple-900 p-2 rounded-s-sm  text-white md:text-center ease-in-out duration-100">Welcome to my home page <Code2Icon size={40} /></h1>
          <div className="flex flex-col justify-center items-center lg:w-1/2 lg:rounded-s-sm max-lg:rounded bg-transparent p-6 space-y-3">
            <div className="flex flex-col items-center w-full p-10 ">
              {user && user.imgurl ? (
                <Image priority={true} src={`${user?.imgurl}`} alt={`${user?.name}`} width={160} height={160} className=" mb-3 rounded-full shadow-lg border-8 border-white " />
              ) : (
                <div className='rounded-full shadow-lg border-8 border-white bg-white p-2 mb-3'>
                  <UserRoundIcon className='w-28 h-28' />
                </div>
              )

              }
              <h5 className="mb-1 text-xl font-medium text-white md:font-semibold">{user?.name}</h5>
              <span className="text-sm text-gray-200">Full Stack Developer</span>
            </div>
              <Link href={""} className="border rounded-md px-6 py-3 text-center bg-gradient-to-br hover:from-blue-400 hover:to-blue-700 duration-200 font-semibold ease-linear text-white">View Resume</Link>
          </div>

          <Card className="flex flex-col justify-center items-center lg:w-1/2 rounded-none max-md:rounded md:rounded-e-sm md:p-6 space-y-3 border-none  bg-transparent">
            <CardContent >
              <Image className="border-4  border-blue-500 rounded-full py-5" width={700} height={700} src={'https://res.cloudinary.com/dggggjcid/image/upload/v1715921548/tmvxvy7t1v5q3orydyfk.png'} alt='' />
            </CardContent>
          </Card>

        </div>
      </section>
      <section className="flex justify-evenly bg-transparent w-full items-center md:py-5 rounded-md shadow-2xl">
        <Card className='max-md:mt-2 w-full md:border border-blue-950 py-2 bg-gradient-to-br from-blue-950 border-none to-purple-700 text-white'>
          <CardHeader>
            <CardTitle>
              Connect with me
            </CardTitle>
            <Separator className='' />

          </CardHeader>

          <CardContent className='grid p-6 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-2'>
            {
              user?.socials.map((link) => (
                <Link key={link.name} className='border rounded-md px-1 py-3 text-center bg-gradient-to-br hover:from-blue-400 hover:to-blue-700 duration-200 ease-linear' target='blank' href={link.url}>{link.name}</Link>
              ))
            }
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
