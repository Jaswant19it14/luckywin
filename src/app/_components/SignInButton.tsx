"use client";
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const SignInButton = () => {
    const {data:session }= useSession();
    if(session&&session.user){
        return(
            <div className='flex'>
                <button onClick={()=>signOut()} className='p-2 bg-sky-700 text-white'>
                    Sign Out
                </button>
            </div>
        )
    }
  return (
    <div className='py-16'>
    <img src="assets/home.svg" alt="" className='pt-12 pb-6' />
    <div className='gap-4 py-4'>
    <p className='flex justify-center text-gray-700 font-medium text-xl  '>
        To play PLease Continue by logging In
    </p>
    <div className='flex justify-center'>

    <button onClick={()=>signIn()} className='p-2 mt-5 rounded bg-sky-700 text-white text-center'>
        Sign In
    </button>
    </div>
    </div>
</div>
  )
}

export default SignInButton