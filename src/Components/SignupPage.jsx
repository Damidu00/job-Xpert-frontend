import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupForm() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "user",
        profilePhoto: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePhoto: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">SignUp</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Full Name</label>
                        <input type="text" name="fullname" required className="w-full p-2 border rounded" onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Email</label>
                        <input type="email" name="email" required className="w-full p-2 border rounded" onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Phone Number</label>
                        <input type="tel" name="phoneNumber" required className="w-full p-2 border rounded" onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Password</label>
                        <input type="password" name="password" required className="w-full p-2 border rounded" onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Role</label>
                        <div className="flex space-x-3">
                            {['admin', 'user', 'company'].map((role) => (
                                <label key={role} className="flex items-center font-bold text-black text-sm">
                                    <input type="radio" name="role" value={role} checked={formData.role === role} onChange={handleChange} className="mr-2" />
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Profile Photo</label>
                        <input type="file" name="profilePhoto" accept="image/*" className="w-full p-2 border rounded mb-2" onChange={handleFileChange} />
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 mb-2">
                            Sign Up
                    </button> 
                    <p className="text-center text-sm">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold" >Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
