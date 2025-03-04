// import React, { useState } from 'react';

// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../Pages/AuthContext';

// function Login() {
//     const { Login } = useAuth();
//     const navigate = useNavigate();
//     const [input, setInput] = useState({
//         email: '',
//         password: ''
//     });

//     const handleLogin = (e) => {
//         e.preventDefault();
//         const loggedUser = JSON.parse(localStorage.getItem("user"));
//         if (!loggedUser) {
//             alert('No registered user found. Please register first.');
//             return;
//         }
//         if (input.email === loggedUser.email && input.password === loggedUser.password) {
//             alert('Login Successfully');
//             Login({ email: input.email, password: input.password });
//             navigate('/');
//             localStorage.setItem('loggedIn', true);
//         } else {
//             alert('Wrong Email or Password');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
//                 {/* Left Image Section */}
//                 <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
//                     <div className="h-full bg-red-600 bg-opacity-50 flex items-center justify-center">
//                         <h2 className="text-3xl font-bold text-white">Welcome to Khapinoz</h2>
//                     </div>
//                 </div>
//                 {/* Form Section */}
//                 <div className="w-full md:w-1/2 p-8">
//                     <h2 className="text-3xl font-bold text-red-600 mb-2">Sign In</h2>
//                     <p className="text-gray-600 mb-6">Login to enjoy the best pizzas in town!</p>
//                     <form onSubmit={handleLogin} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Email</label>
//                             <input
//                                 name="email"
//                                 type="email"
//                                 required
//                                 className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
//                                 placeholder="Enter your email"
//                                 value={input.email}
//                                 onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Password</label>
//                             <input
//                                 name="password"
//                                 type="password"
//                                 required
//                                 className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-red-600 outline-none transition"
//                                 placeholder="Enter your password"
//                                 value={input.password}
//                                 onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
//                             />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                                 <input
//                                     id="remember-me"
//                                     name="remember-me"
//                                     type="checkbox"
//                                     className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
//                                 />
//                                 <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
//                             </div>
//                             <Link to="/forgetpassword" className="text-sm text-red-600 hover:underline">Forgot Password?</Link>
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-yellow-300 transition"
//                         >
//                             Sign In
//                         </button>
//                         <p className="text-center text-sm text-gray-600">
//                             Don’t have an account?{' '}
//                             <Link to="/register" className="text-red-600 font-semibold hover:underline">Register here</Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;


import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';

function Login() {
    const { Login } = useAuth();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleLogin = (e) => {
        e.preventDefault();
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedUser) {
            alert('No registered user found. Please register first.');
            return;
        }
        if (input.email === loggedUser.email && input.password === loggedUser.password) {
            alert('Login Successfully');
            Login({ email: input.email, password: input.password });
            navigate('/');
            localStorage.setItem('loggedIn', true);
        } else {
            alert('Wrong Email or Password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
                {/* Left Image Section */}
                <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
                    <div className="h-full bg-red-600 bg-opacity-50 flex items-center justify-center">
                        <h2 className="text-3xl font-bold text-white">Welcome to Khapinoz</h2>
                    </div>
                </div>
                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-red-600 mb-2">Sign In</h2>
                    <p className="text-gray-600 mb-6">Login to enjoy the best pizzas in town!</p>
                    <form onSubmit={handleLogin} className="space-y-6">
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
                            </div>
                            <Link to="/forgetpassword" className="text-sm text-red-600 hover:underline">Forgot Password?</Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-yellow-300 transition"
                        >
                            Sign In
                        </button>
                        <p className="text-center text-sm text-gray-600">
                            Don’t have an account?{' '}
                            <Link to="/register" className="text-red-600 font-semibold hover:underline">Register here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;