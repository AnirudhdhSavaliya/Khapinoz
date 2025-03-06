


import React, { useState, useEffect } from "react";
import HeroSection from "../Component/Home/HeroSlider";
import { useNavigate } from "react-router-dom";
import apiServices from "../API/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      await apiServices.getRecipes().then((p) => {
        setRecipes(p.data.recipes);
      })
    }
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === '' || recipe.cuisine === filter)
  );

  const readerStar = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStar = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fa-solid fa-star text-yellow-500"></i>);
      }
      if (halfStar) {
        stars.push(<i key="half" className="fa-solid fa-star-half-alt text-yellow-500"></i>);
      }
      for (let i = 0; i < emptyStar; i++) {
        stars.push(<i key={`empty-${i}`} className="fa-regular fa-star text-gray-300"></i>);
      }
      return stars;
    }
  }

  // slider product
  fetch('/burger.json')
    .then(res => res.json())
    .then(data => setData(data))


  const addToCartPreview = (product) => {
    const cartPreview = { ...product, quantity: 1 };
    localStorage.setItem("cartPreview", JSON.stringify(cartPreview));
    navigate(`/cart/${product.id}`);
  };


  return (
    <>
      <HeroSection />
      <div className="w-full flex-wrap p-5 flex justify-between sm:flex-row flex-col gap-4 ">
        <select
          name="filter"
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          className="w-full h-12 sm:w-auto p-3 rounded-md border border-mid-green shadow-sm focus:outline-none focus:ring-2 focus:ring-dark-green"
        >
          <option value="" className="text-mid-green">All Cuisines</option>
          <option value="Italian" className="text-dark-green">🍝 Italian</option>
          <option value="Mexican" className="text-dark-green">🌮 Mexican</option>
          <option value="Indian" className="text-dark-green">🍛 Indian</option>
          <option value="Chinese" className="text-dark-green">🥢 Chinese</option>
          <option value="French" className="text-dark-green">🥖 French</option>
        </select>

        <div className="search w-full sm:w-auto">
          <input
            type="search"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes by name..."
            className="w-full p-3 mb-6 rounded-md border border-mid-green shadow-sm focus:outline-none focus:ring-2 focus:ring-dark-green"
          />
        </div>
      </div>
      <div className="w-full min-h-screen p-5">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-dark-green">Product List</h1>
          {filteredRecipes.length === 0 ? (
            <p className="text-center text-mid-green">
              No recipes found. Try a different search!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRecipes.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-very-light-green"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                    loading="lazy"
                  />
                  <h2 className="text-xl font-semibold text-dark-green truncate">{product.name}</h2>
                  <p className="text-sm text-mid-green truncate">
                    Ingredients: {product.ingredients.join(", ")}
                  </p>
                  <p className="text-sm text-mid-green">Cuisine: {product.cuisine}</p>
                  <p className="text-mid-green font-medium">
                    <span className="font-medium">Rating:</span>{" "}
                    {product.rating ? readerStar(product.rating) : "N/A"}
                  </p>

                  <p className="text-sm text-mid-green">
                    Cooking Time: {product.cookTimeMinutes} mins
                  </p>
                  <div className="" onClick={() => addToCartPreview(product)}>
                    <button className="mt-3 w-full bg-mid-green text-white py-2 rounded-md hover:bg-light-green transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      <div className="h-[700px] bg-gray-100 flex items-center justify-center ">
        <form className="w-full">
          <div className="container m-auto text-center py-5 ">
            <h1 className="text-3xl font-bold mb-5">Soft Drinks Collection 🥤</h1>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={false}
              dots={false}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}

              breakpoints={{
                340: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="w-[100%] max-w-[1500px] cursor-pointer"
            >
              {data.length > 0 ? (
                data.map((product) => (
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
                        className="w-[250px] h-40 m-auto object-cover"

                      />
                      <h5 className="text-1xl font-semibold font-mono">{product.name}</h5>
                      <p className="text-start">{product.description}</p>
                      <p className="text-start">
                        <strong>Price:</strong> ₹{product.price}
                      </p>
                      {/* <p className="text-start">
                                                <strong>Origin:</strong> {product.origin}
                                            </p> */}
                      <p className="text-start text-lg font-semibold">
                        <span className="font-medium">Cooking Time:</span>{" "}
                        {product.rating ? readerStar(product.rating) : "N/A"}
                      </p>
                      <button
                        type="submit"

                        className="mt-3 w-full bg-mid-green hover:bg-light-green text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                        onClick={() => addToCartPreview(product)}
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
}

export default Home;
