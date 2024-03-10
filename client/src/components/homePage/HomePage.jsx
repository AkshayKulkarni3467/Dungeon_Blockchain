import React from 'react'
import User from './User'
import Middle from './Middle'
import Wallet from './Wallet'

const HomePage = () => {
  return (
    <>
        <div className='flex flex-row justify-between bg-white  w-full m-0 p-0 min-h-screen'>
            <div className='flex-1 m-4 p-12 sticky'><User /></div>
            <div className='flex-1 m-4 p-12'><Middle/></div>
            <div className='flex-1 m-4 p-12'><Wallet /></div>
        </div>
    </>
  )
}

export default HomePage