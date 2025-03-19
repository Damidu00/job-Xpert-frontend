import axios from 'axios'
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom'

export default function AddCertifications() {

  const navigate = useNavigate()

  const [formFields,setFormFields] = useState([
    {instituteName : '', certificateName : '',Link : ''},
  ])

  const handleFormChange = ((event, index)=>{
    let data = [...formFields]
    data[index][event.target.name] = event.target.value
    setFormFields(data)
  })


  const handleSubmit = async(event)=>{
    event.preventDefault();

    const postData = {
      userId : "test1",
      cvId : 'cv01',
      certificates: formFields
    }

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + `/api/certificates/`,postData)
      .then((res)=>{
      console.log(res.data)
      alert("succ")
      navigate("/addreferees")
    })
    } catch (error) {
      console.log(error)
    }
  }

  const addFields = (()=>{
    let object = {
      instituteName: '',
      certificateName: '',
      Link : ''
    }
    setFormFields([...formFields, object])
  })

  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center items-center'>
    <div className="w-[900px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Add Your Certificate Details</h2>
            <form className="space-y-4">

            {
              formFields.map((form,index)=>{
                return (
                  <div key={index} className="flex flex-row gap-4">
                    <input type="text" name="instituteName" placeholder="Institute Name:-SLIIT *" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200" 
                    value={form.instituteName}
                    onChange={event => handleFormChange(event,index)}
                    
                    required />
                    <div className=' w-full'>
                        <input type="text" name="certificateName" placeholder="Certificate Name:- Machine Learning *" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200" 
                        value={form.certificateName}
                        onChange={event => handleFormChange(event,index)}
                    
                    required />
                    </div>
                    <input type="text" name="Link" placeholder="Certificate Link:-https://open.uom.lk/lms/mod/customcert/verify_certificate.php " className=" w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200"
                      value={form.Link}
                      onChange={event => handleFormChange(event,index)}
                      
                      required/>
                  </div >
                )
              })
            }              
              <div className='flex justify-end '>
                <CiCirclePlus className='bg-gray-200 text-5xl rounded-full m-2 hover:bg-gray-50 text-blue-300 hover:text-blue-700 hover:scale-120'
                
                onClick={addFields}
                
                />
              </div>
                            
            </form>

            <div className="grid grid-cols-2 gap-4">
                <Link to='/addreferees'>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    
                    onClick={handleSubmit}

                    >Add to CV</button>
                </Link>

                <button type="" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Cancel</button>

                </div>
        </div>
        </div>
  )
}
