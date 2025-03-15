import React from 'react'
import { Link } from 'react-router-dom'

export default function AddAboutMe() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add About Me</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="First Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" name="lastName" placeholder="Last Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="linkedinURL" placeholder="LinkedIn URL" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <input type="text" name="githubURL" placeholder="GitHub URL" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                
                
                <input type="text" name="Address" placeholder="Address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <textarea name="shortBio" placeholder="Short Bio" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-28 resize-none" required></textarea>

                <input type="file" name="profilePhoto" placeholder="Profile Photo URL" className="w-[300px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />

                <div className="grid grid-cols-2 gap-4">
                <Link to='/addskills'>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Add to CV</button>
                </Link>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Cancel</button>

                </div>
            </form>
        </div>
  )
}
