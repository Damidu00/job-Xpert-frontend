import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddAboutMe() {

    // const cvId = 

    const [firstName,setFristName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [linkedinUrl,setLinkedinUrl] = useState("")
    const [githubUrl,setGithubUrl] = useState("")
    const [address,setAddress] = useState("")
    const [bio,setBio] = useState("")
    const [image,setImage] = useState("")


    async function handleSubmit(){
        const details = {
            userId : 'test1',
            cvId : 'cv01',
            firstName : firstName,
            lastName : lastName,
            email : email,
            phone : phoneNumber,
            // profilePhoto : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
            linkedinURL : linkedinUrl,
            githubURL : githubUrl,
            Address : address,
            shortBio : bio
        }

        console.log(details)

        try {
            axios.post(import.meta.env.VITE_BACKEND_URL + `/api/cvuser/`,details)
            .then((res)=>{
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }


    }

    // console.log(setFristName)


  return (
    <div className='bg-gray-50 h-screen w-full flex justify-center items-center'>
    <div className="max-w-2xl mx-auto p-6 shadow-2xl rounded-lg bg-white  ">
            <h2 className="text-3xl font-bold  text-center mb-6 text-blue-600 ">Add Your Details</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="First Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required 
                    
                    onChange={(e)=>{
                        setFristName(e.target.value)
                    }}

                    />
                    <input type="text" name="lastName" placeholder="Last Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required 
                    
                    onChange={(e)=>{
                        setLastName(e.target.value)
                    }}
                    
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required 
                    
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    
                    />
                    <input type="text" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required 
                    
                    onChange={(e)=>{
                        setPhoneNumber(e.target.value)
                    }}
                    
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="linkedinURL" placeholder="LinkedIn URL" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                    
                    onChange={(e)=>{
                        setLinkedinUrl(e.target.value)
                    }}

                    />
                    <input type="text" name="githubURL" placeholder="GitHub URL" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                    
                    onChange={(e)=>{
                        setGithubUrl(e.target.value)
                    }}
                    
                    />
                </div>

                
                
                <input type="text" name="Address" placeholder="Address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required 
                
                onChange={(e)=>{
                    setAddress(e.target.value)
                }}
                
                />
                <textarea name="shortBio" placeholder="Short Bio" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-28 resize-none" required
                
                onChange={(e)=>{
                    setBio(e.target.value)
                }}
                
                ></textarea>

                <input type="file" name="profilePhoto" placeholder="Profile Photo URL" className="w-[300px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                
                onChange={(e)=>{
                    setImage(e.target.files)
                }}
                
                />

                <div className="grid grid-cols-2 gap-4">
                <Link to='/addskills'>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    
                    onClick={handleSubmit}
                    
                    >Add to CV</button>
                </Link>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Cancel</button>

                </div>
            </form>
        </div>
        </div>
  )
}
