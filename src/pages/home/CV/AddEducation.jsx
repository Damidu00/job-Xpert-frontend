import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';
import axios from 'axios';

export default function AddEducation() {
  const [education, setEducation] = useState([
    { eduLevel: '', school: '', degree: '', startDate: '', endDate: '', description: '' },
  ]);

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    const newEducation = [...education];
    newEducation[index][name] = value;
    setEducation(newEducation);
  };

  const addFields = () => {
    setEducation([...education, { eduLevel: '', school: '', degree: '', startDate: '', endDate: '', description: '' }]);
  };

  const userId = "12345";
  const cvId = "67890"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/education/", {
        userId,
        cvId,
        details: education
      });

      console.log(response.data.message);
      alert("Education details saved successfully!");

    } catch (error) {
      console.error("Error saving education details:", error);
      alert("Failed to save education details!");
    }
  };

  const getOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  return (
    <div className='bg-gray-100 h-full w-full flex justify-center items-center'>
      <div className='w-[900px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative'>
        <h2 className='text-3xl font-bold text-blue-600 text-center mb-6'>Add Your Education</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          {education.map((edu, index) => (
            <div key={index} className='border p-4 rounded-lg shadow-sm'>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>{getOrdinal(index + 1)} Education Details</h3>
              <input
                type='text'
                name='eduLevel'
                placeholder='Education Level *'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200'
                value={edu.eduLevel}
                onChange={(event) => handleFormChange(event, index)}
                required
              />
              <input
                type='text'
                name='school'
                placeholder='School/University *'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2'
                value={edu.school}
                onChange={(event) => handleFormChange(event, index)}
                required
              />
              <input
                type='text'
                name='degree'
                placeholder='Degree (if applicable)'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2'
                value={edu.degree}
                onChange={(event) => handleFormChange(event, index)}
              />
              <div className='flex flex-col gap-4 mt-2'>
                <div>
                  <span>Start Date *</span>
                  <input
                    type='date'
                    name='startDate'
                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200'
                    value={edu.startDate}
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
                    value={edu.endDate}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                </div>
              </div>
              <textarea
                name='description'
                placeholder='Description (optional)'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2 h-28 resize-none'
                value={edu.description}
                onChange={(event) => handleFormChange(event, index)}
              ></textarea>
            </div>
          ))}
          <div className='flex justify-end'>
            <CiCirclePlus
              className='bg-gray-200 text-5xl rounded-full m-2 hover:bg-gray-50 text-blue-300 hover:text-blue-700 hover:scale-110'
              onClick={addFields}
            />
          </div>
        </form>
        <div className='grid grid-cols-2 gap-4'>
          <Link to='/addexperience'>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
              onClick={handleSubmit}
            >
              Add to CV
            </button>
          </Link>
          <button
            type='button'
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition duration-300'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
