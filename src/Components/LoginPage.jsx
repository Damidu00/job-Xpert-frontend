import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import { setAuthToken } from "../auth"; // Import auth functions

export default function SignInForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting login request...");
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + `/api/users/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log("Login Response:", res.data);

            if (res.data.status === "success") {
                toast.success("Login succsessfully ");

                // Store the token in local storage
                if (res.data.status === "success") {
                    const token = res.data.data.access_token; // Extract token
                    setAuthToken(token); // Store it in local storage
                
                    console.log("Token stored:", localStorage.getItem("access_token")); // Debugging
                }
                navigate("/");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "An error occurred.");
        }

        const token = localStorage.getItem("access_token")
        console.log("Token Is"+token)
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-blue-500 text-4xl font-bold text-center mb-6">Sign In</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-bold text-sm text-black mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-sm text-black mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-sm text-black mb-2">Role</label>
                        <div className="flex space-x-3">
                            {["admin", "user", "company"].map((role) => (
                                <label key={role} className="flex items-center text-sm font-bold text-black">
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

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                        Sign In
                    </button>

                    <button type="button" className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-200">
                        <FcGoogle className="mr-2 text-xl" />
                        Sign in with Google
                    </button>

                    <p className="text-center text-sm">
                        Don't have an account? <Link to="/signup" className="text-blue-600 font-bold">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}




