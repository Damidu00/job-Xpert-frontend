import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { CiCirclePlus } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';

export default function AddProjects({ onClose }) {
  const location = useLocation()
  const userId = location.state.userId
  // State variables for project details
  const [projects, setProjects] = useState([
    { title: '', description: '', githubLink: '', liveDemo: '', techStack: '' },
  ]);

  // Handle input changes
  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  // Add a new project field
  const addFields = () => {
    setProjects([
      ...projects,
      { title: '', description: '', githubLink: '', liveDemo: '', techStack: '' },
    ]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      userId,
      cvId: 'cv02',
      projects: projects,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/`, postData);

      // Use SweetAlert2 for success message
      Swal.fire({
        title: 'Success!',
        text: 'Projects added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error adding projects:', error.response ? error.response.data : error.message);

      // Use SweetAlert2 for error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add projects. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Helper function to get ordinal numbers
  const getOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Render project fields */}
      {projects.map((project, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{getOrdinal(index + 1)} Project Details</h3>
          <input
            type="text"
            name="title"
            placeholder="Project Title *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={project.title}
            onChange={(event) => handleFormChange(event, index)}
            required
          />
          <textarea
            name="description"
            placeholder="Project Description *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2 h-28 resize-none"
            value={project.description}
            onChange={(event) => handleFormChange(event, index)}
            required
          ></textarea>
          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Link *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            value={project.githubLink}
            onChange={(event) => handleFormChange(event, index)}
            required
          />
          <input
            type="text"
            name="liveDemo"
            placeholder="Live Demo (Optional)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            value={project.liveDemo}
            onChange={(event) => handleFormChange(event, index)}
          />
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (Comma Separated)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            value={project.techStack}
            onChange={(event) => handleFormChange(event, index)}
          />
        </div>
      ))}

      {/* Add New Project Button */}
      <div className="flex justify-end">
        <CiCirclePlus
          className="bg-gray-200 text-5xl rounded-full m-2 hover:bg-gray-50 text-blue-300 hover:text-blue-700 hover:scale-110 cursor-pointer"
          onClick={addFields}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}