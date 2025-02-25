import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Cart() {
      const [recipes, setRecipes] = useState(null);
      const { productId } = useParams();

    useEffect(() => {
        async function fetchRecipes(e) {
            try {
                let response = await fetch(`https://dummyjson.com/recipes/${productId}`)
                let data = await response.json();
                setRecipes(data)
            }
            catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }
        fetchRecipes();
    }, [productId]);

    
    return (
        <div>

                    <div
                      key={recipes.id}
                      className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
                    >
                      
                        {/* <img
                          src={recipes.image}
                          alt={recipes.name}
                          className="w-full h-40 object-cover rounded-md mb-3"
                          loading="lazy"
                        /> */}
                        <h2 className="text-xl font-semibold text-gray-800 truncate">{recipes.name}</h2>
                        <p className="text-sm text-gray-600 truncate">
                          Ingredients: {recipes.ingredients.join(", ")}
                        </p>
                        <p className="text-sm text-gray-600">Cuisine: {recipes.cuisine}</p>
                        <p className="text-gray-700 font-medium">Rating: ⭐ {recipes.rating}</p>
                        <p className="text-sm text-gray-600">
                          Cooking Time: {recipes.cookTimeMinutes} mins
                        </p>
                        
                        <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                          Order Now
                        </button>
                    
                    </div>
              
        </div>
    )
}

export default Cart