import { Admin } from '@/model/Admin'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'


interface ImageComponentProps{
    user: Admin | null;
}

const ImageComponent : React.FC<ImageComponentProps> = (
{user}
) => {
    const router = useRouter();
  return (
    <div className="w-full max-w-sm border rounded-lg shadow bg-gray-900 hover:bg-gray-800 border-gray-700 col-span-1">

            <div className="flex flex-col items-center p-10">
              {user && user.imgurl ? (
                <Image priority={true} src={`${user?.imgurl}`} alt={`${user?.name}`} width={150} height={150} className=" mb-3 rounded-full" />
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
  )
}

export default ImageComponent