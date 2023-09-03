"use client";
import { Footer, NavBar, EditUpdateForm } from '@/components'
import { fetchUpdate } from '@/utils';


export default async function Home({ params }: { params: { id: string } }) {

    const update = await fetchUpdate(params.id)
    return (
        <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
            <NavBar />
            <EditUpdateForm update={update} />
            <Footer />
        </div>
    )
}