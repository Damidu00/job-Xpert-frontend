import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';

export default function AddProjects() {
  const [projects, setProjects] = useState([
    { title: '', description: '', githubLink: '', liveDemo: '', techStack: '' }
  ]);

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  const addFields = () => {
    setProjects([...projects, { title: '', description: '', githubLink: '', liveDemo: '', techStack: '' }]);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log('Submitted Projects:', projects);
  };

  const getOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  return (
    <div className='bg-gray-100 h-full w-full flex justify-center items-center'>
      <div className='w-[900px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative'>
        <h2 className='text-3xl font-bold text-blue-600 text-center mb-6'>Add Your Projects</h2>
        <form className='space-y-4' onSubmit={submit}>
          {projects.map((project, index) => (
            <div key={index} className='border p-4 rounded-lg shadow-sm'>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>{getOrdinal(index + 1)} Project Details</h3>
              <input type='text' name='title' placeholder='Project Title *' className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200' value={project.title} onChange={(event) => handleFormChange(event, index)} required />
              <textarea name='description' placeholder='Project Description *' className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2' value={project.description} onChange={(event) => handleFormChange(event, index)} required></textarea>
              <input type='text' name='githubLink' placeholder='GitHub Link *' className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2' value={project.githubLink} onChange={(event) => handleFormChange(event, index)} required />
              <input type='text' name='liveDemo' placeholder='Live Demo (Optional)' className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2' value={project.liveDemo} onChange={(event) => handleFormChange(event, index)} />
              <input type='text' name='techStack' placeholder='Tech Stack (Comma Separated)' className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 mt-2' value={project.techStack} onChange={(event) => handleFormChange(event, index)} />
            </div>
          ))}
          <div className='flex justify-end'>
            <CiCirclePlus className='bg-gray-200 text-5xl rounded-full m-2 hover:bg-gray-50 text-blue-300 hover:text-blue-700 hover:scale-110' onClick={addFields} />
          </div>
        </form>
        <div className='grid grid-cols-2 gap-4'>
          <Link to='/addexperience'>
            <button type='submit' className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300' onClick={submit}>Add to CV</button>
          </Link>
          <button type='button' className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition duration-300'>Cancel</button>
        </div>
      </div>
    </div>
  );
}
