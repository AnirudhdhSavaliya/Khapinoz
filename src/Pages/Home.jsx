
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import HeroSection from "../Component/Home/HeroSlider";
import { useNavigate } from "react-router-dom";


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchRecipes(e) {
      try {
        let response = await fetch('https://dummyjson.com/recipes')
        let data = await response.json();
        setRecipes(data.recipes)
      }   
      catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === '' || recipe.cuisine === filter)
  );


  return (
    <>
      <HeroSection />
      <div className="w-full flex-wrap p-5 flex justify-between sm:flex-row flex-col gap-4">
        <select name="filter" id="filter" onChange={(e) => setFilter(e.target.value)} className="w-full h-12 sm:w-auto p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="" className="text-gray-500">All Cuisines</option>
          <option value="Italian" className="text-gray-700">🍝 Italian</option>
          <option value="Mexican" className="text-gray-700">🌮 Mexican</option>
          <option value="Indian" className="text-gray-700">🍛 Indian</option>
          <option value="Chinese" className="text-gray-700">🥢 Chinese</option>
          <option value="French" className="text-gray-700">🥖 French</option>
        </select>
        <div className="search w-full sm:w-auto">
          <input type="search" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search recipes by name..." className="w-full p-3 mb-6 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="w-full min-h-screen bg-gray-100 p-5">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
          {filteredRecipes.length === 0 ? (
            <p className="text-center text-gray-600">
              No recipes found. Try a different search!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {
                filteredRecipes.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                      loading="lazy"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
                    <p className="text-sm text-gray-600 truncate">
                      Ingredients: {product.ingredients.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">Cuisine: {product.cuisine}</p>
                    <p className="text-gray-700 font-medium">Rating: ⭐ {product.rating}</p>
                    <p className="text-sm text-gray-600">
                      Cooking Time: {product.cookTimeMinutes} mins
                    </p>
                    <div className="" onClick={() => navigate(`/cart/${product.id}`)}>
                      <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                        Order Now
                      </button>
                    </div>
                  </div>
                ))

              }
            </div>
          )}


        </div>
      </div>
    </>
  );
}

export default Home;
