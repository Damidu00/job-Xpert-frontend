import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SelectTemplate from './CV/SelectTemplate'
import AddAboutMe from './CV/AddAboutMe'
import AddSkills from './CV/AddSkills'
import AddCertifications from './CV/AddCertifications'
import Addreferees from './CV/Addreferees'
import AddEducation from './CV/AddEducation'
import AddExperience from './CV/AddExperience'
import AddProjects from './CV/AddProjects'
import AddCVDetails from './CV/AddCVDetails'
import Cv00 from '../home/CV/templates/cv00'
import Cv01 from './CV/templates/cv01'
import Cv02 from './CV/templates/cv02'

export default function HomePage() {
  return (
    <div>
        <Routes path='/'>
          <Route path='/selecttemplate' element={<SelectTemplate/>}/>
          <Route path='/addaboutme' element={<AddAboutMe/>}/>
          <Route path='/addskills' element={<AddSkills/>}/>
          <Route path='/addcertifications' element={<AddCertifications/>}/>
          <Route path='/addreferees' element={<Addreferees/>}/>
          <Route path='/addeducations' element={<AddEducation/>}/>
          <Route path='/addexperiences' element={<AddExperience/>}/>
          <Route path='/addprojects' element={<AddProjects/>}/>
          <Route path='/addcvdetails' element={<AddCVDetails/>}/>
          <Route path='/viewtemplate/cv00' element={<Cv00/>}/>
          <Route path='/viewtemplate/cv01' element={<Cv01/>}/>
          <Route path='/viewtemplate/cv02' element={<Cv02/>}/>
        </Routes>
    </div>
  )
}
