import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faAnglesRight, faSquareArrowUpRight} from '@fortawesome/free-solid-svg-icons'
import Lottie from "lottie-react";
import eth from './eth.json'

const Wallet = (props) => {
  return (
    <>
    <div className='w-full flex flex-col sticky'>
        <div className=''>
                <div className="flex flex-col w-full justify-center items-center h-[360px] drop-shadow-xl bg-white pt-[20px] rounded-2xl pd-[35px] px-[25px]">
            <div className='text-[16px] font-bold font-sans text-shadow-lg text-slate-700'>My Wallet <FontAwesomeIcon icon={faCaretDown} /></div>
            <Lottie
                animationData={eth}
                className="flex justify-center items-center w-[150px] aspect-1"
                loop={true}
            />
            <div className='text-[18px] font-semibold font-sans bg-slate-100 rounded-lg drop-shadow-lg p-1 px-2 text-shadow-lg text-slate-400'>{(props.address)}</div>
            <div className='flex flex-row text-slate-700 items-center text-[20px] font-semibold font-sans mt-4'>
                    <div className=''>{(props.eth)} ETH</div>
                    &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faAnglesRight}/>
                    &nbsp;&nbsp;
                    <div className=''>{(props.eth * props.rate).toFixed(5)} USD</div>
            </div>
            <div className='mt-4 mb-20 flex w-full flex-row items-center justify-evenly text-white'>
                    <button className='rounded-lg bg-blue-600 drop-shadow-lg px-[18px] py-2'><FontAwesomeIcon icon={faSquareArrowUpRight} />&nbsp;Buy</button>
                    <button className='rounded-lg bg-red-600 drop-shadow-lg px-[18px] py-2'><FontAwesomeIcon icon={faSquareArrowUpRight} />&nbsp;Sell</button>
            </div>
            </div>
        </div>
    </div>
     <div className='flex flex-col justify-center items-center'>
        <div className='h-1 my-[10px] bg-gray-600 w-full rounded-full drop-shadow-sm '></div>
        <div className='w-full flex items-center justify-center'>
            <div className='m-4 py-2 px-4 bg-slate-200 w-2/3 rounded-xl text-center font-semibold drop-shadow-xl'>Your Transacations</div>
        </div>
        <ul style={{listStyleType: 'disc'}} className='' >
            <li className='bg-slate-200 text-slate-600 font-sans font-medium text-4xl px-5 py-3 my-[8px] rounded-lg drop-shadow-xl border-2 border-white '>&#8226; Jhon9947 gifted you 0.003 ETH</li>
            <li className='bg-slate-200 text-slate-600 font-sans font-medium text-4xl px-5 py-3 my-[8px] rounded-lg drop-shadow-xl border-2 border-white '>&#8226; Celestial ROuge gifted you 0.05 ETH</li>
            <li className='bg-slate-200 text-slate-600 font-sans font-medium text-4xl px-5 py-3 my-[8px] rounded-lg drop-shadow-xl border-2 border-white '>&#8226; YOu gifted Aryanx87 0.058 ETH</li>
            <li className='bg-slate-200 text-slate-600 font-sans font-medium text-4xl px-5 py-3 my-[8px] rounded-lg drop-shadow-xl border-2 border-white '>&#8226; You donated 0.025 ETH to the crowdfund 'Jonathan's Blood Donation </li>
            <li className='bg-slate-200 text-slate-600 font-sans font-medium text-4xl px-5 py-3 my-[8px] rounded-lg drop-shadow-xl border-2 border-white '>&#8226; You gifted 0.05 CelestialR0uge ETH</li>
        </ul>
     </div>
     </>
  );
};

Wallet.defaultProps = {
    eth : '2.3467',
    rate : '1234552515',
    address: 'rgerw3428296w4youaheuergtdqalieryuh',
}

export default Wallet;