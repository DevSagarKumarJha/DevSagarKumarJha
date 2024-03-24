import Image from 'next/image'
import React from 'react'
import SocialSection from './SocialSection'

function IntroSection() {
  return (
    <div className='flex flex-col justify-start py-5 px-1'>
      <h1 className="text-2xl sm:text-5xl">Sagar Kumar Jha</h1>

      <div className="mt-10 flex flex-col sm:flex-row  rounded-xl sm:items-center bg-gray-950 p-5 justify-start sm:space-x-5 space-y-3">
        <div >
          <Image width={275} height={275} src={`${process.env.GITHUB_AVATAR_URI}`} className="border border-5 rounded-lg" alt='error' />
        </div>
        <SocialSection/>
      </div>
    </div>
  )
}

export default IntroSection