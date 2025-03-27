import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { CiCirclePlus } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';

export default function AddEducation({ onClose }) {
  const location = useLocation()
  const userId = location.state.userId
  // State variables for education details
  const [education, setEducation] = useState([
    { eduLevel: '', school: '', degree: '', startDate: '', endDate: '', description: '' },
  ]);

  // Handle input changes
  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    const newEducation = [...education];
    newEducation[index][name] = value;
    setEducation(newEducation);
  };

  // Add a new education field
  const addFields = () => {
    setEducation([...education, { eduLevel: '', school: '', degree: '', startDate: '', endDate: '', description: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cvId = "cv02";

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/education/`, {
        userId,
        cvId,
        details: education
      });

      // Use SweetAlert2 for success message
      Swal.fire({
        title: 'Success!',
        text: 'Education details saved successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error saving education details:', error);

      // Use SweetAlert2 for error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to save education details. Please try again.',
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
      {/* Render education fields */}
      {education.map((edu, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{getOrdinal(index + 1)} Education Details</h3>
          <input
            type="text"
            name="eduLevel"
            placeholder="Education Level *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={edu.eduLevel}
            onChange={(event) => handleFormChange(event, index)}
            required
          />
          <input
            type="text"
            name="school"
            placeholder="School/University *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            value={edu.school}
            onChange={(event) => handleFormChange(event, index)}
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree (if applicable)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            value={edu.degree}
            onChange={(event) => handleFormChange(event, index)}
          />
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <span>Start Date *</span>
              <input
                type="date"
                name="startDate"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={edu.startDate}
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
                value={edu.endDate}
                onChange={(event) => handleFormChange(event, index)}
              />
            </div>
          </div>
          <textarea
            name="description"
            placeholder="Description (optional)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2 h-28 resize-none"
            value={edu.description}
            onChange={(event) => handleFormChange(event, index)}
          ></textarea>
        </div>
      ))}

      {/* Add New Education Button */}
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