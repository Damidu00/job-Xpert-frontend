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

  useEffect(() => {
    if (currentUser) {
      setInput({
        fullname: currentUser.fullname || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        bio: currentUser.profile?.bio || "",
        skills: currentUser.profile?.skills?.join(", ") || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", input.fullname);
    formDataToSend.append("email", input.email);
    formDataToSend.append("phoneNumber", input.phoneNumber);
    formDataToSend.append("bio", input.bio);
    formDataToSend.append("skills", input.skills);

    if (resume) {
      formDataToSend.append("resume", resume);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/profile/update",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        onUpdateSuccess && onUpdateSuccess();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="rounded-lg p-6 space-y-8">
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
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
      />
      
      <div className="py-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">Upload Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
       
      <div className="flex justify-end gap-4 mt-10">
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
          className="px-6 py-2"
          sx={{ height: '48px' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2"
          sx={{ height: '48px' }}
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;