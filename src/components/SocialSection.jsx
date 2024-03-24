import Link from 'next/link'
import React from 'react'


function SocialSection() {
  return (
    <div className='' >
      <ul className=' space-y-5'>
        <li>
          <Link href={"https://www.linkedin.com/in/devsagarkumarjha"} target='_blank' className='text-2xl'>
          <i className="fa-brands fa-linkedin"></i> LinkedIn
          </Link>
        </li>
        <li>
          <Link href={"https://www.github.com/devsagarkumarjha"} target='_blank' className='text-2xl'>
            <i className='fa-brands fa-github'></i> Github
          </Link>
        </li>
        <li>
          <Link href={"https://www.instagram.com/cod.ersagar/"} target='_blank' className='text-2xl'>
          <i className='fa-brands fa-instagram'></i> Instagram
          </Link>
        </li>
        <li>
        <Link href={"mailto:devsagarkumarjha@gmail.com"} target='_blank' className='text-2xl'>
          <i className='fa-solid fa-envelope'></i> E-Mail
          </Link>
        </li>

        <button className='bg-white text-gray-950 px-4 py-2 rounded-md font-semibold lg:text-2xl'>Download CV</button>
      </ul>
    </div >
  )
}

export default SocialSection