import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddReferees() {
  const navigate = useNavigate()
  const [referees, setReferees] = useState([
    { refType: 'male', FirstName: '', LastName: '', position: '', workingPlace: '', location: '', phone: '' },
    { refType: 'male', FirstName: '', LastName: '', position: '', workingPlace: '', location: '', phone: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updatedReferees = [...referees];
    updatedReferees[index][field] = value;
    setReferees(updatedReferees);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      userId: "12345", 
      cvId: "67890",  
      referees: referees
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/referees/`,
        payload
      );
      console.log("Success:", response.data);
      alert("Referees added successfully!");
      navigate("/addeducations")
    } catch (error) {
      console.error("Error submitting referees:", error);
      alert("Failed to add referees.");
    }
  };

  return (
    <div className='bg-gray-100  w-full flex justify-center items-center'>
    <div className="max-w-3xl mx-auto mt-10 mb-5 p-8  shadow-lg rounded-xl bg-white">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Add Referees</h2>
      <form className="space-y-6">
        {referees.map((referee, index) => (
          <div key={index} className="p-6 border rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Referee {index + 1}</h3>
            <div className="flex items-center space-x-6 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">

                <input
                  type="radio"
                  name={`gender${index}`}
                  value="male"
                  checked={referee.refType === 'male'}
                  onChange={(e) => handleChange(index, 'refType', e.target.value)}
                  className="hidden"
                />

                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${referee.refType === 'male' ? 'bg-blue-600' : 'border-gray-400'}`}>
                  {referee.refType === 'male' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                </div>
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">

                <input
                  type="radio"
                  name={`gender${index}`}
                  value="female"
                  checked={referee.refType === 'female'}
                  onChange={(e) => handleChange(index, 'refType', e.target.value)}
                  className="hidden"
                />

                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${referee.refType === 'female' ? 'bg-pink-500' : 'border-gray-400'}`}>
                  {referee.refType === 'female' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                </div>
                <span className="text-gray-700">Female</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">

              <input type="text" placeholder="First Name" value={referee.FirstName} onChange={(e) => handleChange(index, 'FirstName', e.target.value)} className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-200" />

              <input type="text" placeholder="Last Name" value={referee.LastName} onChange={(e) => handleChange(index, 'LastName', e.target.value)} className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-200" />

            </div>

            <input type="text" placeholder="Position" value={referee.position} onChange={(e) => handleChange(index, 'position', e.target.value)} className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-200 mt-3" />

            <input type="text" placeholder="Working Place" value={referee.workingPlace} onChange={(e) => handleChange(index, 'workingPlace', e.target.value)} className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-200 mt-3" />

            <input type="text" placeholder="Location" value={referee.location} onChange={(e) => handleChange(index, 'location', e.target.value)} className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-200 mt-3" />

            <input type="text" placeholder="Phone" value={referee.phone} onChange={(e) => handleChange(index, 'phone', e.target.value)} className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-200 mt-3" />

          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <Link to="">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
            
            onClick={handleSubmit}
            
            >Add to CV</button>
          </Link>
          <button type="button" className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-md">Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
}