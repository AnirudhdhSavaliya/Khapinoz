


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";


const Cart = () => {
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  // const { productId } = useParams();
  const [drinkData, setDrinkData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const cartPreview = JSON.parse(localStorage.getItem("cartPreview")) || {};
    setProduct(cartPreview);

    fetch("/drink.json")
      .then((res) => res.json())
      .then((data) => setDrinkData(data))
      .catch((error) => console.error("Error fetching drinks:", error));
  }, []);

 

  const addToCart = (item, quantity = count) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cartData.find((cartItem) => cartItem.id === item.id);

    if (existing) {
      existing.quantity = (existing.quantity || 0) + quantity;
    } else {
      cartData.push({ ...item, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    alert("Added to Cart Successfully!");
    navigate("/addtocart");
  };

  const sendData = (e) => {
    e.preventDefault();
    alert("Order placed!");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star text-yellow-500"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fa-solid fa-star-half-alt text-yellow-500"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star text-gray-300"></i>);
    }
    return stars;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 max-w-4xl transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img
                src={product.image || "https://via.placeholder.com/400"}
                alt={product.name || "Product"}
                className="w-full h-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                  {product.name || "Loading..."}
                </h1>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Description:</span> {product.description || "N/A"}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Price:</span> ₹{product.price || "N/A"}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Rating:</span>{" "}
                  {product.rating ? renderStars(product.rating) : "N/A"}
                </p>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  <span className="font-medium">Ingredients:</span>{" "}
                  {product.ingredients?.join(", ") || "Not available"}
                </p>
              
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <button
                    className="bg-mid-green hover:bg-light-green text-white px-4 py-2 rounded-md font-semibold transition duration-200 active:scale-95"
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                  >
                    -
                  </button>
                  <p className="text-2xl font-bold text-gray-800">{count}</p>
                  <button
                    className="bg-mid-green hover:bg-light-green text-white px-4 py-2 rounded-md font-semibold transition duration-200 active:scale-95"
                    onClick={() => setCount((c) => c + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-mid-green hover:bg-light-green text-white py-3 px-6 rounded-lg font-semibold text-lg transition duration-300 shadow-md active:scale-95"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[600px] bg-gray-100 flex items-center justify-center ">
        <form onSubmit={sendData} className="w-full">
          <div className="container m-auto text-center py-5 ">
            <h1 className="text-3xl font-bold mb-5">Soft Drinks Collection 🥤</h1>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}

              breakpoints={{
                340: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="w-[100%] max-w-[1300px]"
            >
              {drinkData.length > 0 ? (
                drinkData.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div
                      style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        borderRadius: "10px",
                        background: "#fff",
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      className="m-4"
                    >
                      <img
                        src={product.image || "https://via.placeholder.com/150"}
                        alt={product.name}
                        className="w-[50%] m-auto object-cover"
                      />
                      <h3 className="text-2xl font-semibold font-mono">{product.name}</h3>
                      <p className="text-start">{product.description}</p>
                      <p className="text-start">
                        <strong>Price:</strong> ₹{product.offer_price}
                      </p>
                      <p className="text-start">
                        <strong>Brand:</strong> {product.brand}
                      </p>
                      <p className="text-start text-lg font-semibold">
                        Rating: {renderStars(product.rating)} {product.rating}
                      </p>
                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        className="mt-3 w-full bg-mid-green hover:bg-light-green text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="h-[400px] flex items-center justify-center">
                    <p>Loading drinks...</p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </form>

      </div>
    </>
  );
};

export default Cart;


