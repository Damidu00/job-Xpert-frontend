import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { Link } from 'react-router-dom'

export default function AddSkills() {

  const [formFields,setFormFields] = useState([
    {name : '', age : ''},
  ])

  const handleFormChange = ((event, index)=>{
    let data = [...formFields]
    data[index][event.target.name] = event.target.value
    setFormFields(data)
  })


  const submit = (()=>{
    console.log(formFields)
  })

  const addFields = (()=>{
    let object = {
      name: '',
      age: ''
    }
    setFormFields([...formFields, object])
  })

  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center items-center'>
    <div className="w-[900px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Your Skills</h2>
            <form className="space-y-4" onSubmit={submit}>

            {
              formFields.map((form,index)=>{
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <input type="text" name="category" placeholder="Programming *" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200" 
                    value={form.category}
                    onChange={event => handleFormChange(event,index)}
                    
                    required />
                    <div className=' w-full pl-32 '>
                      <input type="text" name="items" placeholder="java,c,c++ " className=" w-full p-1.5 border rounded-lg focus:ring-2 focus:ring-gray-200"
                      value={form.items}
                      onChange={event => handleFormChange(event,index)}
                      
                      />
                    </div>
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
                <Link to='/addcertifications'>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    
                    onClick={submit}

                    >Add to CV</button>
                </Link>

                <button type="" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Cancel</button>

                </div>
        </div>
      </div>
  )
}
