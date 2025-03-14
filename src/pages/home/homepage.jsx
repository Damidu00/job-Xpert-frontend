import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SelectTemplate from './CV/SelectTemplate'
import AddAboutMe from './CV/AddAboutMe'

export default function HomePage() {
  return (
    <div>
        <Routes path='/'>
          <Route path='/selecttemplate' element={<SelectTemplate/>}/>
          <Route path='/addaboutme' element={<AddAboutMe/>}/>
        </Routes>
    </div>
  )
}
