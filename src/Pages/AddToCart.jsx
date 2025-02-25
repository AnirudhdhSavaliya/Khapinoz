import React, { useEffect, useState } from "react";

function AddToCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const getCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(getCart);
    }, []);

        
    const handleOrderNow = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty! Add items before ordering.");
            return;
        }
        alert("🎉 Your order has been placed successfully!");
        setCartItems([]);
        localStorage.removeItem("cart"); 
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
            {cartItems.length > 0 ? (
                <div className="grid gap-6">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center border p-4 rounded-lg shadow-md bg-white">
                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />

                            <div className="ml-4 flex-1">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">⭐ Rating: {item.rating}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                                    onClick={() => {
                                        let updatedItems = [...cartItems];
                                        updatedItems[index].quantity = Math.max(1, (updatedItems[index].quantity || 1) - 1);
                                        setCartItems(updatedItems);
                                        localStorage.setItem("cart", JSON.stringify(updatedItems));
                                    }}> ➖</button>
                                <span className="text-lg font-medium">{item.quantity || 1}</span>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                                    onClick={() => {
                                        let updatedItems = [...cartItems];
                                        updatedItems[index].quantity = (updatedItems[index].quantity || 1) + 1;
                                        setCartItems(updatedItems);
                                        localStorage.setItem("cart", JSON.stringify(updatedItems));
                                    }}>➕</button>
                            </div>

                            <button
                                className="ml-4 bg-dark-green hover:bg-mid-green text-white px-3 py-1 rounded"
                                onClick={() => {
                                    let updatedItems = cartItems.filter((_, i) => i !== index);
                                    setCartItems(updatedItems);
                                    localStorage.setItem("cart", JSON.stringify(updatedItems));
                                }}
                            >
                               Remove
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-dark-green hover:bg-mid-green text-white py-2 px-6 rounded-lg text-lg font-semibold transition"
                            onClick={handleOrderNow}
                        >
                             Order Now
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Your cart is empty! 🛒</p>
            )}
        </div>
    );
}

export default AddToCart;
