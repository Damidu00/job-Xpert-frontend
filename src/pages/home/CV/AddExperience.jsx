import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';

export default function AddExperience() {
  const navigate = useNavigate()
  const [experiences, setExperiences] = useState([
    { company: '', jobTitle: '', startDate: '', endDate: '', description: '' },
  ]);

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  const addFields = () => {
    setExperiences([
      ...experiences,
      { company: '', jobTitle: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const submit = async (e) => {
    e.preventDefault();
    
    const postData = {
      userId : "test1",
      cvId : 'cv01',
      experiences: experiences
    } 

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + `/api/experience/`,postData).then((res)=>{
        console.log(res.data)
        alert('Experience added successfully!');
        navigate("/addprojects")
      })
      
    } catch (error) {
      console.error('Error adding experience:', error.response ? error.response.data : error.message);
      alert('Failed to add experience.');
    }
  };

  return (
    <div className='bg-gray-100 h-full w-full flex justify-center items-center'>
      <div className='w-[900px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative'>
        <h2 className='text-3xl font-bold text-blue-600 text-center mb-6'>
          Add Your Experience
        </h2>
        <form className='space-y-4' >
          {experiences.map((experience, index) => (
            <div key={index} className='border p-4 rounded-lg shadow-sm'>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                {index + 1} Experience Details
              </h3>
              <input
                type='text'
                name='company'
                placeholder='Company Name *'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200'
                value={experience.company}
                onChange={(event) => handleFormChange(event, index)}
                required
              />
              <input
                type='text'
                name='jobTitle'
                placeholder='Job Title *'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2'
                value={experience.jobTitle}
                onChange={(event) => handleFormChange(event, index)}
                required
              />
              <div className='grid grid-cols-2 gap-4 mt-2'>
                <div>
                  <span>Started Date *</span>
                  <input
                    type='date'
                    name='startDate'
                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200'
                    value={experience.startDate}
                    onChange={(event) => handleFormChange(event, index)}
                    required
                  />
                </div>
                <div>
                  <span>End Date</span>
                  <input
                    type='date'
                    name='endDate'
                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200'
                    value={experience.endDate}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                </div>
              </div>
              <textarea
                name='description'
                placeholder='Description (optional)'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2 h-28 resize-none'
                value={experience.description}
                onChange={(event) => handleFormChange(event, index)}
              ></textarea>
            </div>
          ))}
          <div className='flex justify-end'>
            <CiCirclePlus
              className='bg-gray-200 text-5xl rounded-full m-2 hover:bg-gray-50 text-blue-300 hover:text-blue-700 hover:scale-110 cursor-pointer'
              onClick={addFields}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
            
              onClick={submit}
            >
              Add to CV
            </button>
            <button
              type='button'
              className='w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition duration-300'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
