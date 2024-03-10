import React from 'react'
import Lottie from "lottie-react";
import UserAnimation from './UserAnimation.json'
import logo from './logo.jpeg'

const User = (props) => {
  return (
    <>
      <div className='w-[400px] h-[250px] flex flex-col justify-start items-center rounded-xl bg-slate-100 drop-shadow-xl p-4'>
        <div className='w-full flex flex-row items-center justify-start gap-[15px] px-4 '>
          <img src={props.image} alt="" className='w-32 h-32 rounded-lg' />
          <div className='flex flex-col justify-center'>
            <div className='text-[18px] font-semibold'>{props.name}</div>
            <div className='text-[12px] text-gray-500 font-regular'>{props.bio}</div>
          </div>
        </div>
        <div className=' text-[15px] px-[4px] py-[2px] m-6 font-poppins font-medium bg-gray-200 rounded-lg text-gray-500'>{props.address}</div>
        <div className='my-[12px] text-[16px] h-[50px] w-full flex flex-row px-[4px] items-center justify-around gap-[12px]'>
          <div className='flex flex-col justify-center items-center text-center'>
            <div className='text-slate-900 h-[32px]'>Posts</div>
            <div className='font-bold mt-[16px]'>{props.posts}</div>
          </div>
          <div className='flex flex-col justify-center items-center text-center'>
            <div className='text-slate-900 h-[32px]'>Comments</div>
            <div className='font-bold mt-[16px]'>{props.comments}</div>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-slate-900  h-[32px]'>Followers</div>
            <div className='font-bold mt-[16px]'>{props.followers}</div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col w-full justify-center items-center aspect-1 mt-10">
        <Lottie
          animationData={UserAnimation}
          className="flex justify-center items-center min-w-[250px] max-w-[450px] aspect-1"
          loop={true}
        />
      </div>
    </>
  )
}

User.defaultProps = {
  image: logo,
  name: 'ContextVectors',
  bio: 'Yoooo... our 1st Blockchain App',
  address: 'rgerw3428296w4youaheuergtdqalieryuh',
  posts: '4',
  comments: '526',
  followers: '2053'
}

export default User