"use client";
import { Footer, NavBar, EditUpdateForm } from '@/components'


export default async function Home({ params }: { params: { id: string } }) {
    return (
        <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
            <NavBar />
            <EditUpdateForm id={params.id} />
            <Footer />
        </div>
    )
}