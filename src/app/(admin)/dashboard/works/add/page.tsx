
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import AddProjectForm from './components/AddProjectForm'


const page = () => {
  return (
    <section className='text-white'>
      <Card className='max-md:mt-2 w-full bg-gray-900 min-h-screen border-gray-700 text-white'>
        <CardHeader >
          <div className='flex justify-between items-center'>
            <CardTitle>Add Project</CardTitle>
          </div>
        </CardHeader>
          <Separator/>
        <CardContent className='flex w-full p-6 justify-center items-center'>
          <AddProjectForm/>
        </CardContent>
      </Card>
    </section>
  )
}

export default page