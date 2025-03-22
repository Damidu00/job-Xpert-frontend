import axios, { Axios } from 'axios'
import React, { useEffect } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { Link } from 'react-router-dom'

export default function Dashboard() {

  return (
    <div className='bg-gray-200 h-screen w-full flex justify-center items-center'>
        <div className='w-[900px] h-[600px] bg-gray-100 shadow-2xl'>
          <div className=' flex w-full h-[250px] justify-center items-center'>
          <Link to='/addcvdetails'>
          <div className='bg-gray-300 w-[200px] h-[200px] hover:bg-gray-400 flex justify-center items-center text-8xl hover:text-blue-200 rounded-2xl'>
            <CiSquarePlus/>
          </div>
          </Link>
          </div>
        </div>      
    </div>
  )
}
