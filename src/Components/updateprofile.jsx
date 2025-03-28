 // UpdateProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateProfile = ({ setOpen }) => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
  });
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          toast.error("Unauthorized! Please log in again.");
          return;
        }

        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.data.success) {
          const user = response.data.user;
          setInput({
            fullname: user.fullname || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            bio: user.profile?.bio || "",
            skills: user.profile?.skills?.join(", ") || "",
          });
        }
      } catch (error) {
        // toast.error("Failed to load user data.");
      }
    };

    fetchUser();
  }, []);

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
        import.meta.env.VITE_BACKEND_URL + "/api/users/profile/update",
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
        toast.success(response.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className=" rounded-lg shadow-md p-3 m-2 space-x-3"  >

        <div className="mb-2">
           {/* Full Name */}
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          value={input.fullname}
          onChange={handleChange}
          name="fullname"
          className=""
        />
        </div>
      
      
        <div className="mb-2">
          {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={input.email}
          onChange={handleChange}
          name="email"
          className="mb-5"
        />
      
        </div>

        <div>
           {/* Phone Number */}
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={input.phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          sx={{ mb: 2 }}
        />
        </div>
         
         <div className="mb-4">
         <TextField
          label="Bio"
          variant="outlined"
          fullWidth
          multiline
          rows={1}
          value={input.bio}
          onChange={handleChange}
          name="bio"
          className="mb-4"
        />
         </div>
         <div>
           {/* Skills */}
        <TextField
          label="Skills"
          variant="outlined"
          fullWidth
          value={input.skills}
          onChange={handleChange}
          name="skills"
          className="mb-4"
        />
         </div>
      
        {/* Resume Upload */}
      <div className="py-3 px-2" >
        <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-50 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
               
      </div >
       
      {/* Submit Button */}
      <div className="flex justify-center">
      <Button
        variant="contained"
        color="primary"
        size="big"
        sx={{ fontWeight: 'bold' }}
        
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold p-4 rounded "
      >
        Update Profile
      </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;