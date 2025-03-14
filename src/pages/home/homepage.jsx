import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SelectTemplate from './CV/SelectTemplate'

export default function HomePage() {
  return (
    <div>
        <Routes path='/'>
          <Route path='/selecttemplate' element={<SelectTemplate/>}/>
        </Routes>
    </div>
  )
}
