import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { CiCirclePlus } from 'react-icons/ci';

export default function AddSkills({ onClose }) {
  // State variables for form fields
  const [formFields, setFormFields] = useState([{ category: '', items: '' }]);

  // Handle form field changes
  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  // Add a new skill field
  const addFields = () => {
    setFormFields([...formFields, { category: '', items: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      userId: 'test1',
      cvId: 'cv01',
      skills: formFields,
    };

    console.log(postData);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/skills/`, postData);

      // Use SweetAlert2 for success message
      Swal.fire({
        title: 'Success!',
        text: 'Skills added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error:', error);

      // Use SweetAlert2 for error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add skills. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Render dynamic skill fields */}
      {formFields.map((form, index) => (
        <div key={index} className="flex flex-col gap-4">
          {/* Category Input */}
          <input
            type="text"
            name="category"
            placeholder="Programming *"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={form.category}
            onChange={(event) => handleFormChange(event, index)}
            required
          />

          {/* Items Input */}
          <div className="pl-8">
            <input
              type="text"
              name="items"
              placeholder="java, c, c++"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form.items}
              onChange={(event) => handleFormChange(event, index)}
            />
          </div>
        </div>
      ))}

      {/* Add New Skill Button */}
      <div className="flex justify-end">
        <CiCirclePlus
          className="bg-gray-200 text-5xl rounded-full m-2 hover:bg-gray-50 text-blue-300 hover:text-blue-700 hover:scale-120 cursor-pointer"
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