import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sign In Data:", formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* Sign In Title */}
                <h2 className="text-blue-500 text-4xl font-bold text-center mb-6">Sign In</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block font-bold text-sm text-black mb-2">Email</label>
                        <input type="email" name="email" required className="w-full p-2 border rounded" onChange={handleChange} />
                    </div>
                    
                    {/* Password */}
                    <div>
                        <label className="block font-bold text-sm text-black mb-2">Password</label>
                        <input type="password" name="password" required className="w-full p-2 border rounded" onChange={handleChange} />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block font-bold text-sm text-black mb-2">Role</label>
                        <div className="flex space-x-3">
                            {['admin', 'user', 'company'].map((role) => (
                                <label key={role} className="flex items-center text-sm font-bold text-black">
                                    <input type="radio" name="role" value={role} checked={formData.role === role} onChange={handleChange} className="mr-2" />
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                        Sign In
                    </button> 

                    {/* Google Sign-In Button */}
                    <button type="button" className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-200">
                        <FcGoogle className="mr-2 text-xl" />
                        Sign in with Google
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm">
                        Don't have an account? <Link to="/signup" className="text-blue-600 font-bold">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
