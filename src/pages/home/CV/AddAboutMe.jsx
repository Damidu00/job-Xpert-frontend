import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddAboutMe({ onClose }) {
  const location = useLocation();
  const userId = location.state?.userId;

  console.log("userId " + userId);

  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const validateName = (value) => {
    return /^[a-zA-Z\s]*$/.test(value); // Only allow alphabets and spaces
  };

  // Function to validate phone number field (only numbers)
  const validatePhoneNumber = (value) => {
    return /^[0-9]*$/.test(value); // Only allow numeric characters
  };

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const details = {
      userId,
      cvId: "cv02",
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      linkedinURL: linkedinUrl,
      githubURL: githubUrl,
      Address: address,
      shortBio: bio,
    };

    console.log(details);

    try {
      await axios
        .post(import.meta.env.VITE_BACKEND_URL + `/api/cvuser/`, details)
        .then((res) => {
          onClose();
          console.log(res.data);
          Swal.fire({
            title: "Success!",
            text: "Details added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((res) => {
          toast.error("Error to add user details");
        });
    } catch (error) {
      console.error(error);
      alert("Failed to add details. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
          value={firstName}
          onChange={(e) => {
            if (validateName(e.target.value)) {
              setFirstName(e.target.value);
            }
          }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
          value={lastName}
          onChange={(e) => {
            if (validateName(e.target.value)) {
              setLastName(e.target.value);
            }
          }}
        />
      </div>

      {/* Email and Phone Number */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
          value={phoneNumber}
          onChange={(e) => {
            if (validatePhoneNumber(e.target.value)) {
              setPhoneNumber(e.target.value);
            }
          }}
        />
      </div>

      {/* LinkedIn URL and GitHub URL */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="linkedinURL"
          placeholder="LinkedIn URL"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setLinkedinUrl(e.target.value)}
        />
        <input
          type="text"
          name="githubURL"
          placeholder="GitHub URL"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setGithubUrl(e.target.value)}
        />
      </div>

      {/* Address */}
      <input
        type="text"
        name="Address"
        placeholder="Address"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        required
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Short Bio */}
      <textarea
        name="shortBio"
        placeholder="Short Bio (max 250 characters)"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-28 resize-none"
        required
        value={bio}
        onChange={(e) => {
          if (e.target.value.length <= 250) {
            setBio(e.target.value);
          }
        }}
      ></textarea>
      <p className="text-sm text-gray-500">{bio.length}/250 characters</p>

      {/* Profile Photo */}
      <input
        type="file"
        name="profilePhoto"
        placeholder="Profile Photo"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setImage(e.target.files[0])}
      />

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
