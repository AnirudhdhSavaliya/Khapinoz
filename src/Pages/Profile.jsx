import React, { useEffect, useState } from 'react';
import { useAuth } from '../Pages/AuthContext';
import ProfileImage from "../assets/profileImage.png";

function Profile() {
    const { user, data, profileData } = useAuth();
    const [image, setImage] = useState(profileData?.image || "");
    const [name, setName] = useState(data?.name || "");
    const [number, setNumber] = useState(profileData?.number || "");
    const [email, setEmail] = useState(user?.email || "");
    const [address, setAddress] = useState(profileData?.address || "")
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const savedProfile = JSON.parse(localStorage.getItem("profileData"));
        if (savedProfile) {
            setName(savedProfile.name || "");
            setNumber(savedProfile.number || "");
            setEmail(savedProfile.email || "");
            setAddress(savedProfile.address || "");
            setBirth(savedProfile.birth || "");
            setGender(savedProfile.gender || "");
            setImage(savedProfile.image || "");
        }


    }, []);

    function ProfileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setImage(event.target.result);
                localStorage.setItem("profileImage", reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSave() {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!number) newErrors.number = "Phone Number is required";
        if (!email) newErrors.email = "Email is required";
        if (!address) newErrors.address = "Address is required";
        if (!birth) newErrors.birth = "Date of Birth is required";
        if (!gender) newErrors.gender = "Gender is required";
        setErrors(newErrors);

        window.location.reload()
        if (Object.keys(newErrors).length === 0) {
            const savedUser = JSON.parse(localStorage.getItem("user"));

            const updatedUser = {
                name,
                email,
                password: savedUser?.password,
            };

            const profileData = { image, name, number, address, email, birth, gender };

            localStorage.setItem("profileData", JSON.stringify(profileData));
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Profile saved successfully!");
        }


    }

    return (
        <div className="bg-gradient-to-b pt-14 p-6 sm:mx-auto my-8">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border-t-4 border-[#66785F]-500">
                <div className="flex flex-col items-center">
                    <h1 className='font-bold pb-4'>My Profile</h1>
                    <div className="w-24 h-24 bg-gray-300 flex items-center justify-center relative rounded-full">
                        {image ? (
                            <img
                                src={image}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span className="text-4xl font-bold text-blue-600">
                                <img src={ProfileImage} alt="imag" />
                            </span>
                        )}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={ProfileUpload}
                            className="hidden"
                        />
                        <label
                            htmlFor="image"
                            className="absolute bottom-0 right-0 bg-[#66785F] p-2 rounded-full cursor-pointer z-70 w-8 h-8 flex items-center justify-center"
                        >
                            <span className="text-white text-xs rounded-full">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                        </label>
                    </div>
                    <div className="mt-4 w-full">
                        <input
                            type="text"
                            className="mt-4 w-full border border-gray-300 rounded-md p-2 outline-none"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="mt-4 w-full">
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 outline-none"
                                value={number}
                                maxLength="10"
                                placeholder="Phone Number"
                                onChange={(e) => setNumber(e.target.value)}
                            />

                        </div>
                        {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                    </div>
                    <div className="mt-4 w-full">
                        <div className="flex items-center justify-between">
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-md p-2 outline-none"
                                value={email}
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mt-4 w-full">
                        <textarea
                            type="address"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none"
                            value={address}
                            placeholder="Enter your address (e.g., 123 Main St, New York, NY)"
                            onChange={((e) => setAddress(e.target.value))}

                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div className="mt-4 w-full ">
                        <input
                            type="date"
                            placeholder="Date of birth"
                            value={birth}
                            className="mt-4 w-full border border-gray-300 rounded-md p-2 outline-none "
                            onChange={(e) => setBirth(e.target.value)} style={{}}
                        />
                        {errors.birth && <p className="text-red-500 text-sm">{errors.birth}</p>}
                    </div>
                    <div className="mt-4 w-full">

                        <select
                            className="mt-4 w-full border border-gray-300 rounded-md p-2 outline-none cursor-pointer"
                            value={gender}

                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>

                    {gender && (
                        <div className="mt-4">
                            <p>Selected Gender: <strong>{gender}</strong></p>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-[#66785F] w-full mt-5 h-10 border rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;

