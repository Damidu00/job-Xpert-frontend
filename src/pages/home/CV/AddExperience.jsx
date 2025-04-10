import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { CiCirclePlus } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';

export default function AddExperience({ onClose }) {
  const location = useLocation();
  const userId = location.state.userId;

  // State variables for experience details
  const [experiences, setExperiences] = useState([
    { company: '', jobTitle: '', startDate: '', endDate: '', description: '' },
  ]);

  // Handle input changes
  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    const newExperiences = [...experiences];

 
    if (name === 'description' && value.length > 250) {
      return; 
    }

    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  // Add a new experience field
  const addFields = () => {
    setExperiences([
      ...experiences,
      { company: '', jobTitle: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      userId,
      cvId: "cv02",
      experiences: experiences,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/experience/`, postData);

      // Use SweetAlert2 for success message
      Swal.fire({
        title: 'Success!',
        text: 'Experience added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error adding experience:', error.response ? error.response.data : error.message);

      // Use SweetAlert2 for error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add experience. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Render experience fields */}
      {experiences.map((experience, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{index + 1} Experience Details</h3>
          <input
            type="text"
            name="company"
            placeholder="Company Name *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={experience.company}
            onChange={(event) => handleFormChange(event, index)}
            required
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            value={experience.jobTitle}
            onChange={(event) => handleFormChange(event, index)}
            required
          />
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <span>Start Date *</span>
              <input
                type="date"
                name="startDate"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={experience.startDate}
                onChange={(event) => handleFormChange(event, index)}
                required
              />
            </div>
            <div>
              <span>End Date</span>
              <input
                type="date"
                name="endDate"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={experience.endDate}
                onChange={(event) => handleFormChange(event, index)}
              />
            </div>
          </div>
          <textarea
            name="description"
            placeholder="Description (max 250 characters)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2 h-28 resize-none"
            value={experience.description}
            onChange={(event) => handleFormChange(event, index)}
          ></textarea>
          <p className="text-sm text-gray-500">{experience.description.length}/250 characters</p>
        </div>
      ))}

      {/* Add New Experience Button */}
      <div className="flex justify-end">
        <CiCirclePlus
          className="bg-gray-200 text-5xl rounded-full m-2 hover:bg-gray-50 text-blue-300 hover:text-blue-700 hover:scale-110 cursor-pointer"
          onClick={addFields}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
          onClick={onClose} // Close the dialog on cancel
        >
          Cancel
        </button>
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