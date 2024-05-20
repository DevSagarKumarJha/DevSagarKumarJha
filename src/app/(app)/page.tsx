'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Admin } from "@/model/Admin";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Code2Icon, ExpandIcon, Loader, LoaderIcon, UserRoundIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});


  const toggleDescriptionExpand = (projectId: string) => {
    setExpandedDescriptions((prevExpandedDescriptions) => ({
      ...prevExpandedDescriptions,
      [projectId]: !prevExpandedDescriptions[projectId],
    }));
  };

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
    <main className="flex flex-col items-center bg-transparent justify-between lg:px-24 px-1 space-y-8 mb-3">
      <section id="about" className="flex flex-col justify-evenly bg-transparent w-full items-center lg:py-5 rounded-md ">
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
      <section className="flex flex-col justify-evenly bg-transparent w-full items-center lg:py-5 rounded-md ">
        <Card className='max-md:mt-2 w-full md:border border-blue-950 py-2 bg-gradient-to-br from-blue-950 border-none to-purple-700 text-white'>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-6">
            {user?.bio}
          </CardContent>
        </Card>
      </section>
      <section className="flex justify-evenly bg-transparent w-full items-center  rounded-md shadow-2xl">
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

      <section id="work" className='text-white space-y-2 flex w-full rounded-md bg-transparent'>
        <Card className='w-full border-blue-950 py-2 bg-gradient-to-br from-blue-950 border-none to-purple-700  text-white'>
          <CardHeader >
            <div className='flex justify-between items-center'>
              <CardTitle>My Work</CardTitle>
            </div>
          </CardHeader>
          <Separator className='bg-blue-950' />

          {
            isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <LoaderIcon className='w-10 h-10 text-white animate-spin' />
                <h1 className='text-xl text-white'>Loading</h1>
              </div>
            ) :
              (
                <CardContent className='md:p-6 container flex w-full justify-center items-start md:items-center'>
                  {
                    user?.projects.length === 0 ? (
                      <div className="flex min-h-screen w-full justify-center items-center">
                        <h1 className='text-lg'>No works Found </h1>
                      </div>
                    ) : (
                      <Carousel
                        className="w-full mt-4">
                        <CarouselContent
                          className='ml-4 gap-2 max-w-sm md:max-w-md'
                        >
                          {user?.projects.map((work) => (
                            <CarouselItem
                              className="cursor-pointer rounded-xl border p-3 space-y-4 w-full bg-gradient-to-br to-purple-700  from-blue-900 border-blue-900 hover:from-blue-400 hover:to-blue-700"
                              key={work._id}>
                              <div className="aspect-video  rounded-xl relative ">
                                <Image
                                  src={work.images[0]}
                                  fill
                                  alt={work.title}
                                  className='object-contain rounded-md' />
                              </div>
                              <div className='flex justify-between items-center'>
                                <p className="font-semibold text-lg">{work.title}</p>
                                <Link className='p-2 border  rounded' href={work.url}><ExpandIcon /></Link>
                              </div>
                              {
                                expandedDescriptions[work._id] && (
                                  <p className="text-ellipsis">
                                    {work.description}
                                  </p>
                                ) || (
                                  <p className="text-ellipsis">
                                    {work.description.slice(0, 105)}
                                  </p>
                                )
                              }

                              <Button type="button" onClick={() => toggleDescriptionExpand(work._id)} >
                                {expandedDescriptions[work._id] ? 'Show less' : 'Show more'}
                              </Button>
                            </CarouselItem>

                          ))
                          }

                        </CarouselContent>
                        {
                          user && user?.projects.length <= 1 ? (
                            <div >


                            </div>
                          ) : (
                            <div className='max-md:hidden'>
                              <CarouselPrevious className='text-black ' />
                              <CarouselNext className='text-black' />
                            </div>
                          )
                        }

                      </Carousel>
                    )
                  }
                </CardContent>
              )
          }
        </Card>


      </section>
    </main>
  );
}
