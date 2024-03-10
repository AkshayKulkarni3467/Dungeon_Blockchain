import React from 'react'
import Lottie from "lottie-react";
import animationData from "./login.json";
import {Link} from 'react-router-dom'

const LoginForm = () => {
  // const login = useRef(null);
  // const signup = useRef(null);
  return (
    <div className='w-full flex flex-row justify-center sm-flex-col h-[450px] mt-11'>
      <div className="hidden md:flex flex-col w-full justify-center items-center aspect-1">
        <Lottie
          animationData={animationData}
          className="flex justify-center items-center min-w-[250px] max-w-[450px] aspect-1"
          loop={true}
        />
      </div>
      <form class="w-full h-[450px] text-[16px] mr-[40px] flex flex-col items-center justify-center mr-52 mt-20">
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full  text-slate-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_company" class="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
          </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full  text-slate-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_password" class="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <p id="helper-text-explanation" class="m-2  text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
        <div className='w-full flex items-center justify-center'>
        <button type="submit" className="flex justify-center align-center text-white bg-orange-400 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg  w-full sm:w-auto px-10 py-2.5 text-center dark:bg-n dark:hover:bg-orange-700 dark:focus:ring-orange-800 mt-7"><Link to="/homepage">Login</Link></button>
        </div>

      </form>

    </div>
  )
}

export default LoginForm