"use client";
import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Loader2, PlusSquareIcon } from 'lucide-react'
import { Admin } from '@/model/Admin';
import axios, { AxiosError } from 'axios';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { skillSchema } from '@/schemas/skillSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';


function SkillCard() {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<Admin | null>(null);

    const form = useForm<z.infer<typeof skillSchema>>({
        resolver: zodResolver(skillSchema),
    });

    const skillName = form.watch('skill')

    const addSkill = (skill: string) => {
        form.setValue('skill', skill);
    }

    useEffect(() => {
        async function fetchUserData() {
            try {
                setIsLoading(true);
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
                console.error('Error fetching data:', error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserData();
    }, []);

    const onSubmit = async (data: z.infer<typeof skillSchema>) => {
        try {
            const response = await axios.post('api/skills', { ...data })
            toast({ title: response.data.message })
            form.reset({ ...form.getValues(), skill: '' });
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title: 'Error',
                description: axiosError.response?.data.message ?? 'Failed to sent message',
                variant: 'destructive',
            });
        }
    }

    if (isLoading) {
        return (
            <Loader2 className="h-10 w-10 text-white animate-spin" />
        )
    }
    else {
        return (
            <Card className='bg-gray-900 text-white border-red-400 w-full'>
                <CardHeader>
                    <div className="flex justify-between items-center space-x-4">
                        <CardTitle className='text-red-400'>Skills</CardTitle>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={"default"}>
                                    <PlusSquareIcon className='w-5 h-5' />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Add skill</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                                                <FormField
                                                    control={form.control}
                                                    name='skill'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Add new skill"
                                                                    {...field}
                                                                />
                                                            </FormControl>

                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex justify-center">
                                                    {isLoading ? (
                                                        <Button disabled>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Please wait
                                                        </Button>
                                                    ) : (
                                                        <Button type="submit" disabled={isLoading || !skillName}>
                                                            Add
                                                        </Button>
                                                    )}
                                                </div>
                                            </form>
                                        </Form>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardHeader>
                <Separator className='bg-red-400' />

                <div className='grid grid-cols-3 p-2 md:grid-cols-6 lg:grid-cols-8 gap-4'>
                    {
                        user?.skills.map((skill, index) => (
                            <Button key={index} className='text-white md:text-lg bg-red-400'>{skill}</Button>
                        ))
                    }
                </div>
            </Card>
        )
    }

}

export default SkillCard