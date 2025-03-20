import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AddAboutMe from './AddAboutMe'; // Import the AddAboutMe component
import AddSkills from './AddSkills'; // Import the AddSkills component
import AddCertifications from './AddCertifications';

export default function AddCVDetails() {
  // State to manage the visibility of the dialog and the current component to render
  const [openDialog, setOpenDialog] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  // Function to open the dialog and set the component to render
  const handleOpenDialog = (component) => {
    setCurrentComponent(component); // Set the component to render
    setOpenDialog(true); // Open the dialog
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setCurrentComponent(null); // Reset the component
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Build Your CV
      </h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Add About Me */}
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300"
          onClick={() => handleOpenDialog(<AddAboutMe onClose={handleCloseDialog} />)}
        >
          <span className="text-lg font-medium text-gray-700">Add About Me</span>
          <FaPlus className="text-xl text-blue-500" />
        </div>

        {/* Add Skills */}
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300"
          onClick={() => handleOpenDialog(<AddSkills onClose={handleCloseDialog} />)}
        >
          <span className="text-lg font-medium text-gray-700">Add Skills</span>
          <FaPlus className="text-xl text-blue-500" />
        </div>

        {/* Add Certificates */}
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300"
          onClick={() => handleOpenDialog(<AddCertifications onClose={handleCloseDialog} />)} // Replace with actual component
        >
          <span className="text-lg font-medium text-gray-700">Add Certificates</span>
          <FaPlus className="text-xl text-blue-500" />
        </div>

        {/* Add Referees */}
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300"
          onClick={() => handleOpenDialog(<AddReferees onClose={handleCloseDialog} />)} // Replace with actual component
        >
          <span className="text-lg font-medium text-gray-700">Add Referees</span>
          <FaPlus className="text-xl text-blue-500" />
        </div>

        {/* Add Education */}
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300"
          onClick={() => handleOpenDialog(<AddEducation onClose={handleCloseDialog} />)} // Replace with actual component
        >
          <span className="text-lg font-medium text-gray-700">Add Education</span>
          <FaPlus className="text-xl text-blue-500" />
        </div>

        {/* Add Experiences */}
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300"
          onClick={() => handleOpenDialog(<AddExperiences onClose={handleCloseDialog} />)} // Replace with actual component
        >
          <span className="text-lg font-medium text-gray-700">Add Experiences</span>
          <FaPlus className="text-xl text-blue-500" />
        </div>

        {/* Add Projects */}
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300"
          onClick={() => handleOpenDialog(<AddProjects onClose={handleCloseDialog} />)} // Replace with actual component
        >
          <span className="text-lg font-medium text-gray-700">Add Projects</span>
          <FaPlus className="text-xl text-blue-500" />
        </div>
      </div>

      {/* MUI Dialog Box */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle className="text-2xl font-bold text-gray-800">
          {currentComponent?.type.name || 'Add Details'}
        </DialogTitle>
        <DialogContent>
          {/* Render the selected component inside the dialog */}
          {currentComponent}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}