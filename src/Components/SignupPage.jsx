import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "user",
        profilePhoto: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, profilePhoto: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("fullname", formData.fullname);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("role", formData.role);
        
        if (formData.profilePhoto) {
            formDataToSend.append("file", formData.profilePhoto);
        }

        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + `/api/users/register`,
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            required
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            required
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Role</label>
                        <div className="flex space-x-3">
                            {["admin", "user", "company"].map((role) => (
                                <label key={role} className="flex items-center font-bold text-black text-sm">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-black text-sm mb-2">Profile Photo</label>
                        <input
                            type="file"
                            name="profilePhoto"
                            accept="image/*"
                            className="w-full p-2 border rounded mb-2"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 mb-2">
                        Sign Up
                    </button>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-bold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
