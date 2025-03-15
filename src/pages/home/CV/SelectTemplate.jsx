import React from 'react'
import { Link } from 'react-router-dom'

export default function SelectTemplate() {
  return (
    <div>
        <Link to='/addaboutme'><button className='p-4 bg-blue-400'>add details</button></Link>
    </div>
  )
}
