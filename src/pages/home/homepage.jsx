import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SelectTemplate from './CV/SelectTemplate'
import AddAboutMe from './CV/AddAboutMe'
import AddSkills from './CV/AddSkills'
import AddCertifications from './CV/AddCertifications'
import Addreferees from './CV/Addreferees'

export default function HomePage() {
  return (
    <div>
        <Routes path='/'>
          <Route path='/selecttemplate' element={<SelectTemplate/>}/>
          <Route path='/addaboutme' element={<AddAboutMe/>}/>
          <Route path='/addskills' element={<AddSkills/>}/>
          <Route path='/addcertifications' element={<AddCertifications/>}/>
          <Route path='/addreferees' element={<Addreferees/>}/>
        </Routes>
    </div>
  )
}
