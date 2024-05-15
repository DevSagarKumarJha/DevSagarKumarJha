import React from 'react'
import AddCertificateForm from "../components/AddCertificateForm"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'


const AddCertificatePage = () => {

  return (
    <section className='text-white'>
      <Card className='max-md:mt-2 w-full bg-gray-900 border-gray-700 text-white'>
        <CardHeader >
          <div className='flex justify-between items-center'>
            <CardTitle>Add Certificates</CardTitle>
          </div>
        </CardHeader>
          <Separator/>
        <CardContent className='flex w-full justify-center items-center'>
          <AddCertificateForm />
        </CardContent>
      </Card>
    </section>
  )
}

export default AddCertificatePage