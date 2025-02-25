import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(input));
        navigate("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
                <div
                    className="hidden md:block md:w-1/3 bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // New reliable pizza image
                        backgroundColor: '#dc2626', // Fallback red color if image fails
                    }}
                >
                    <div className="absolute inset-0 bg-red-600 bg-opacity-60 flex flex-col justify-center p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Join Khapinoz Pizza</h3>
                        <p className="text-sm text-gray-100">Register now for exclusive pizza deals and fast delivery!</p>
                    </div>
                </div>
                <div className="w-full md:w-2/3 p-8">
                    <h2 className="text-3xl font-bold text-red-600 mb-2">Create Account</h2>
                    <p className="text-gray-600 mb-6">Start your pizza journey with us!</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
                                placeholder="Enter your name"
                                value={input.name}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
                                placeholder="Enter your email"
                                value={input.email}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
                                placeholder="Enter your password"
                                value={input.password}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                I accept the <Link to="/" className="text-red-600 hover:underline">Terms & Conditions</Link>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-yellow-300 transition"
                        >
                            Register
                        </button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-red-600 font-semibold hover:underline">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;