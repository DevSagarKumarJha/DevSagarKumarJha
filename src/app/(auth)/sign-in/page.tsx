"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import * as z from "zod";
import {useState } from 'react';
import { signInSchema } from '@/schemas/signInSchema';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        });

        if (result?.error) {
            if (result?.error == 'CredentialsSignin') {
                toast({
                    title: 'Login Failed',
                    description: "Incorrect username or password",
                    variant: "destructive"
                })
                setLoading(false)
            }
            else {
                toast({
                    title: 'Login Failed',
                    description: result.error,
                    variant: "destructive"
                })
                setLoading(false)
            }
        }

        if (result?.url) {
            setLoading(false)
            router.replace('/dashboard')
        }
    }
    return (
        <section className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-3 bg-white rounded-xl shadow-xl'>
                <div className='flex justify-center items-center text-center bg-blue-500 rounded-lg pt-4'>
                    <h1 className="text-2xl font-bold tracking-tighter text-white  lg:text-4xl mb-6 ">
                        Admin Login
                    </h1>
                </div>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='identifier'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>AdminId / Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='adminId / email' {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='password' type='password' {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button className='bg-blue-500 w-full text-2xl' type='submit'>
                            {
                                loading ? (<>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                                </>) : ("Sign In")
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}

