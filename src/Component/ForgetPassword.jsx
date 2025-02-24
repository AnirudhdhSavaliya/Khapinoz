import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../assets/Screenshot-2025-02-22-223336.svg'
function ForgetPassword() {
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        if (input.email !== loggedUser.email) {
            document.getElementById('emailError').textContent = "Verify Your Email Is Right";
            setTimeout(() => {
                document.getElementById('emailError').textContent = "";
            }, 3000);
            return;
        }
        if (input.password !== input.confirmPassword) {
            alert("Password and Confirm Password should be same");
            return;
        }
        localStorage.setItem("user", JSON.stringify(input));
        alert("Password changed successfully! Please login.");
        navigate("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                    <Link to="/" className="flex items-center justify-center mb-4">
                        <img src={img1} alt="" width={200}/>
                    </Link>
                    <h2 className="text-2xl font-bold text-red-600">Reset Your Password</h2>
                    <p className="text-gray-600 mt-2">Enter your details to reset your password.</p>
                </div>
                <form onSubmit={sendData} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
                            placeholder="Enter your email"
                            required
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        />
                        <div id="emailError" className="text-red-500 text-sm mt-1"></div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
                            placeholder="Enter new password"
                            required
                            value={input.password}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
                            placeholder="Confirm new password"
                            required
                            value={input.confirmPassword}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-yellow-300 transition"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;