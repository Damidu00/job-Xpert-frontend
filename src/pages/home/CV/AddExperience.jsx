import React from 'react';
import { Link } from 'react-router-dom';

export default function AddExperience() {
  return (
    <div className='bg-gray-50 h-screen w-full flex justify-center items-center'>
      <div className="max-w-2xl mx-auto p-6 shadow-2xl rounded-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Add Your Experience</h2>
        <form className="space-y-4">
          <input type="text" name="company" placeholder="Company Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          <input type="text" name="jobTitle" placeholder="Job Title" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          <div className="grid grid-cols-2 gap-4">
            <div>
                <span>Started Date</span>
                <input type="date" name="startDate" placeholder="Start Date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
                <span>End Date</span>
                <input type="date" name="endDate" placeholder="End Date (if applicable)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>          
          </div>
          <textarea name="description" placeholder="Description (optional)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-28 resize-none"></textarea>
          
          <div className="grid grid-cols-2 gap-4">
            <Link to='/addskills'>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Add to CV</button>
            </Link>
            <button type="button" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
