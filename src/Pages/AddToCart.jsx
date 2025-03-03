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

    
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.offer_price || 100;
            return total + price * (item.quantity || 1);
        }, 0);
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center">
          <span className="mr-2">🛒</span> Your Cart
        </h2>
        {cartItems.length > 0 ? (
          <div className="grid gap-2 sm:gap-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-t border-b border-gray-200 py-4 bg-white"
              >
                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mr-3 sm:mr-4"
                />

                <div className="flex-1 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      ⭐ Rating: {item.rating || "N/A"}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 px-1 py-0 sm:px-2 sm:py-1 rounded text-sm sm:text-base"
                        onClick={() => {
                          let updatedItems = [...cartItems];
                          updatedItems[index].quantity = Math.max(1, (updatedItems[index].quantity || 1) - 1);
                          setCartItems(updatedItems);
                          localStorage.setItem("cart", JSON.stringify(updatedItems));
                        }}
                      >
                        ➖
                      </button>
                      <span className="text-sm sm:text-base font-medium">{item.quantity || 1}</span>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 px-1 py-0 sm:px-2 sm:py-1 rounded text-sm sm:text-base"
                        onClick={() => {
                          let updatedItems = [...cartItems];
                          updatedItems[index].quantity = (updatedItems[index].quantity || 1) + 1;
                          setCartItems(updatedItems);
                          localStorage.setItem("cart", JSON.stringify(updatedItems));
                        }}
                      >
                        ➕
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm sm:text-base font-semibold">
                        ₹{(item.offer_price || 100) * (item.quantity || 1)}
                      </p>
                      <button
                        className="bg-red-500 hover:bg-red-600  text-white p-1 rounded text-xs sm:text-sm font-medium"
                        onClick={() => {
                          let updatedItems = cartItems.filter((_, i) => i !== index);
                          setCartItems(updatedItems);
                          localStorage.setItem("cart", JSON.stringify(updatedItems));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* टोटल अमाउंट सेक्शन */}
            <div className="border p-3 sm:p-4 rounded-lg shadow-md bg-white mt-2 sm:mt-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Summary</h3>
              <div className="flex justify-between mb-1 text-sm sm:text-base">
                <span className="text-gray-600">Price:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-1 text-sm sm:text-base">
                <span className="text-gray-600">Discount:</span>
                <span className="text-green-600">₹0</span>
              </div>
              <div className="flex justify-between mb-1 text-sm sm:text-base">
                <span className="text-gray-600">Shipping Charge:</span>
                <span>₹49</span>
              </div>
              <div className="flex justify-between font-semibold text-base sm:text-lg border-t pt-2">
                <span>Payable Amount:</span>
                <span>₹{calculateTotal() + 49}</span>
              </div>
            </div>

            {/* बटन सेक्शन */}
            <div className="grid gap-3 mt-4 sm:mt-6 lg:w-96 lg:m-auto">
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-base sm:text-lg font-semibold transition"
                onClick={() => alert("Redirect to Add Delivery Address")}
              >
                Add Delivery Address
              </button>
              <button
                className="bg-green-700 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-base sm:text-lg font-semibold transition"
                onClick={handleOrderNow}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-base sm:text-lg">Your cart is empty! 🛒</p>
        )}
      </div>
    );
}

export default AddToCart;
