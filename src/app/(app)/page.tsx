'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Admin } from "@/model/Admin";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { ArrowUpRight, Code2Icon, GithubIcon, GlobeIcon, InstagramIcon, LinkedinIcon, Loader, LoaderIcon, TwitterIcon, UserRoundIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
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
    <main className="flex flex-col items-center bg-transparent justify-between lg:px-24 px-3 space-y-8 mb-3">
      <section id="about" className="flex flex-col justify-evenly bg-transparent w-full mt-5 items-center lg:py-5 rounded-md">
        <div className="flex flex-col lg:flex-row w-full max-lg:min-h-screen lg:h-[79vh] bg-gradient-to-br from-gray-900  to-zinc-900 border max-md:space-y-2 border-white  rounded-xl shadow-2xl">
          <h1 className="text-xl md:text-3xl flex flex-col gap-2 justify-center items-center shadow-lg bg-gradient-to-tr from-zinc-800 to-gray-950 p-2 max-md:rounded-t-3xl md:rounded-s-3xl  text-white md:text-center  duration-100 ease-linear">Welcome to my home page <Code2Icon size={40} /></h1>

          <div className="flex max-md:flex-col-reverse">
            <div className="flex flex-col justify-center items-center lg:w-1/2 lg:rounded-s-sm max-lg:rounded bg-transparent md:p-6 space-y-3">
              <div className="flex flex-col items-center w-full md:p-10 ">
                {user && user.imgurl ? (
                  <Image priority={true} src={`${user?.imgurl}`} alt={`${user?.name}`} width={160} height={160} className=" mb-3 rounded-full shadow-lg border-8 border-white " />
                ) : (
                  <div className='rounded-full shadow-lg border-8 border-white bg-white p-2 mb-3'>
                    <UserRoundIcon className='w-28 h-28' />
                  </div>
                )

                }
                <h5 className="mb-1 text-xl md:text-3xl font-medium text-white md:font-semibold">{user?.name}</h5>
                <span className="text-sm md:text-xl text-gray-200">Full Stack Developer</span>
              </div>
              <Link
                href={"https://drive.google.com/file/d/1dBHVlaYZwap438UmQ-5YjWWf-SgV9Xwy/view?usp=sharing"}
                target="_blank"
                className="border rounded-md px-6 py-3 text-center bg-gradient-to-br hover:from-blue-400 hover:to-blue-700 duration-200 font-semibold ease-linear text-white">View Resume</Link>
            </div>

            <Card className="flex flex-col justify-center items-center lg:w-1/2 rounded-none max-md:rounded md:rounded-e-sm p-6 space-y-3 border-none  bg-transparent">
              <CardContent >
                <Image className="border-4  border-gray-50 rounded-full py-5" width={700} height={700} src={'https://res.cloudinary.com/dggggjcid/image/upload/v1715921548/tmvxvy7t1v5q3orydyfk.png'} alt='' />
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
      <section className="flex flex-col justify-evenly border border-gray-50 bg-transparent w-full items-center lg:py-5 rounded-md bg-gradient-to-br from-gray-900  to-zinc-950 ">
        <Card className='max-md:mt-2 w-full md:border border-blue-950 py-2 bg-gradient-to-br from-gray-900 border-none to-zinc-950 text-white'>
          <CardHeader>
            <CardTitle className="text-3xl">Summary</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 md:text-lg">
            {user?.bio}
          </CardContent>
        </Card>
      </section>

      <section id="skills" className='text-white space-y-2 flex w-full rounded-md bg-transparent border border-gray-50'>
        <Card className='w-full  py-2 bg-gradient-to-br from-gray-900  to-zinc-950  text-white'>
          <CardHeader >
            <div className='flex justify-between items-center'>
              <CardTitle>Skills</CardTitle>
            </div>
          </CardHeader>
          <Separator className='bg-gray-200' />

          <CardContent className='md:p-6 p-4 container flex w-full justify-center items-start md:items-center'>
            {
              user?.skills.length === 0 ? (
                <div className="flex min-h-screen w-full justify-center items-center">
                  <h1 className='text-lg'>No skills Found </h1>
                </div>
              ) : (
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                  opts={{
                    align: "center",
                    loop: true,

                  }}
                  className="w-3/4 mt-4">
                  <CarouselContent
                    className='ml-0 gap-6 w-3/5 md:w-1/6'
                  >
                    {user?.skills.sort().map((skill, index) => (
                      <CarouselItem
                        className="cursor-pointer flex justify-center items-center  rounded-xl border p-3 space-y-4 max-w-sm bg-gradient-to-br to-zinc-800  from-gray-900 border-gray-400 hover:from-blue-400 hover:to-blue-700 ease-in-out duration-300"
                        key={index}>
                        <p>{skill}</p>
                      </CarouselItem>))}
                  </CarouselContent>

                  <CarouselPrevious className='text-black ' />
                  <CarouselNext className='text-black' />

                </Carousel>
              )
            }
          </CardContent>
        </Card>
      </section>

      <section id="work" className='text-white space-y-2 flex w-full rounded-md bg-transparent border border-gray-50'>
        <Card className='w-full  py-2 bg-gradient-to-br from-gray-900  to-zinc-950  text-white'>
          <CardHeader >
            <div className='flex justify-between items-center'>
              <CardTitle>Projects</CardTitle>
            </div>
          </CardHeader>
          {
            isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <LoaderIcon className='w-10 h-10 text-white animate-spin' />
                <h1 className='text-xl text-white'>Loading</h1>
              </div>
            ) :
              (
                <CardContent className='md:p-6 p-4 container flex w-full justify-center items-start md:items-center'>
                  {
                    user?.projects.length === 0 ? (
                      <div className="flex min-h-screen w-full justify-center items-center">
                        <h1 className='text-lg'>No works Found </h1>
                      </div>
                    ) : (
                      <Carousel
                        plugins={[
                          Autoplay({
                            delay: 5000,
                          }),
                        ]}
                        opts={{
                          align: "center",
                          loop: true
                        }}
                        className="w-[78%] mt-4">
                        <CarouselContent
                          className='ml-0 gap-6 max-w-md'
                        >
                          {user?.projects.map((work) => (
                            <CarouselItem
                              className="cursor-pointer rounded-xl border p-3 space-y-4 w-full bg-gradient-to-br to-zinc-800  from-gray-900 border-gray-400 hover:from-blue-400 hover:to-blue-700 ease-in-out duration-300"
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
                                <Link className='p-2 border  rounded hover:bg-white hover:text-black' href={work.url}><ArrowUpRight /></Link>
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

                              <Button type="button" className="hover:bg-white hover:text-black" onClick={() => toggleDescriptionExpand(work._id)} >
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
                            <div>
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

      <section className="flex justify-evenly bg-transparent w-full items-center border border-gray-50 rounded-md shadow-2xl">
        <Card className='max-md:mt-2 w-full md:border border-blue-950 py-2 bg-gradient-to-br from-gray-900 border-none to-zinc-950 text-white'>
          <CardHeader>
            <CardTitle className="text-3xl">
              Connect with me
            </CardTitle>

          </CardHeader>
          <Separator />

          <CardContent className='flex justify-center items-center px-6 py-10 gap-x-4 gap-2'>
            {
              user?.socials.map((link) => (
                <Link key={link.name} className='hover:animate-bounce  border rounded-full p-4 text-center bg-gradient-to-br hover:from-blue-400 hover:to-blue-700 duration-1000 ease-linear' target='blank' href={link.url}>
                  {
                    link.name === 'LinkedIn' ? (<LinkedinIcon className="md:w-8" />) : link.name === 'Github' ? (<GithubIcon className="md:w-8" />) : link.name === 'Instagram' ? (<InstagramIcon className="md:w-8" />) : link.name === 'Twitter' || link.name === 'X' ? (<TwitterIcon className="md:w-8" />) : (<GlobeIcon className="md:w-8" />)
                  }
                </Link>
              ))
            }
          </CardContent>
        </Card>
      </section>


    </main>
  );
}
