// UpdateProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateProfile = ({ setOpen, currentUser, onUpdateSuccess }) => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
  });
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setInput({
        fullname: currentUser.fullname || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        bio: currentUser.profile?.bio || "",
        skills: currentUser.profile?.skills?.join(", ") || "",
      });
      if (currentUser.profile?.resumeOriginalName) {
        setResumeName(currentUser.profile.resumeOriginalName);
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload only PDF files');
        e.target.value = null;
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        e.target.value = null;
        return;
      }
      setResume(file);
      setResumeName(file.name);
      toast.success('Resume selected successfully');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Unauthorized! Please log in again.");
        return;
      }

      // Validate required fields
      if (!input.fullname || !input.email) {
        toast.error("Full name and email are required!");
        return;
      }

      // First update the user profile without resume
      const skillsArray = input.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== '');

      const profileData = {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber || '',
        bio: input.bio || '',
        skills: skillsArray
      };

      // Update profile information
      const profileResponse = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/users/update',
        data: profileData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      // If resume is selected, update it separately
      if (resume) {
        const formData = new FormData();
        formData.append('resume', resume);

        await axios({
          method: 'POST',
          url: 'http://localhost:5000/api/users/upload-resume',
          data: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
      }

      toast.success("Profile updated successfully!");
      if (onUpdateSuccess) {
        await onUpdateSuccess();
      }
      setOpen(false);

    } catch (error) {
      console.error('Update error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      let errorMessage = "Failed to update profile";
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data?.message || "Invalid input data";
        } else if (error.response.status === 401) {
          errorMessage = "Session expired. Please login again.";
          localStorage.removeItem('access_token');
        } else if (error.response.status === 413) {
          errorMessage = "File size too large. Please upload a smaller resume.";
        } else {
          errorMessage = error.response.data?.message || "Failed to update profile";
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg p-6 space-y-8">
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        required
        value={input.fullname}
        onChange={handleChange}
        name="fullname"
        className="mb-8"
        sx={{ marginBottom: '32px' }}
      />
      
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        required
        value={input.email}
        onChange={handleChange}
        name="email"
        className="mb-8"
        sx={{ marginBottom: '32px' }}
      />

      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={input.phoneNumber}
        onChange={handleChange}
        name="phoneNumber"
        className="mb-8"
        sx={{ marginBottom: '32px' }}
      />
         
      <TextField
        label="Bio"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={input.bio}
        onChange={handleChange}
        name="bio"
        className="mb-8"
        sx={{ marginBottom: '32px' }}
      />

      <TextField
        label="Skills (comma-separated)"
        variant="outlined"
        fullWidth
        value={input.skills}
        onChange={handleChange}
        name="skills"
        className="mb-8"
        sx={{ marginBottom: '32px' }}
        placeholder="e.g. JavaScript, React, Node.js"
      />
      
      <div className="py-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">Upload Resume (PDF)</label>
        <div className="space-y-2">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {resumeName && (
            <p className="text-sm text-gray-600">
              Current resume: {resumeName}
            </p>
          )}
          <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
        </div>
      </div>
       
      <div className="flex justify-end gap-4 mt-10">
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
          className="px-6 py-2"
          sx={{ height: '48px' }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2"
          sx={{ height: '48px' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;