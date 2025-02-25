import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Cart() {
    const [recipes, setRecipes] = useState({});
    const [count, setCount] = useState(1); 
    const { productId } = useParams();
    

    useEffect(() => {
        async function fetchRecipes() {
            try {
                let response = await fetch(`https://dummyjson.com/recipes/${productId}`);
                let data = await response.json();
                console.log('Fetched recipes:', data);
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }
        fetchRecipes();
    }, [productId]);

    function addtocart() {
        alert("Added to Cart");
        const getData = JSON.parse(localStorage.getItem('cart')) || [];
        let existing = getData.find((item) => item.id === recipes.id);

        if (existing) {
            existing.quantity = (existing.quantity || 0) + count;
        } else {
            getData.push({ ...recipes, quantity: count });
        }

        localStorage.setItem('cart', JSON.stringify(getData));
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 max-w-4xl transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <img
                                src={recipes.image}
                                alt={recipes.name}
                                className="w-full h-auto rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        <div className="md:w-1/2 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                                    {recipes.name}
                                </h1>
                                <p className="text-gray-600 text-lg mb-2">
                                    <span className="font-medium">Cuisine:</span> {recipes.cuisine}
                                </p>
                                <p className="text-gray-600 text-lg mb-2">
                                    <span className="font-medium">Cooking Time:</span> {recipes.cookTimeMinutes} mins
                                </p>
                                <p className="text-gray-600 text-lg mb-2">
                                    <span className="font-medium">Rating:</span> ⭐ {recipes.rating || 'N/A'}
                                </p>
                                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                    <span className="font-medium">Ingredients:</span>{' '}
                                    {recipes.ingredients?.join(', ') || 'Not available'}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        className="bg-dark-green hover:bg-mid-green text-white px-4 py-2 rounded-md font-semibold transition duration-200 active:scale-95"
                                        onClick={() => setCount((c) => c + 1)}
                                    >
                                        +
                                    </button>
                                    <p className="text-2xl font-bold text-gray-800">{count}</p>
                                    <button
                                        className="bg-dark-green hover:bg-mid-green text-white px-4 py-2 rounded-md font-semibold transition duration-200 active:scale-95"
                                        onClick={() => setCount((c) => Math.max(1, c - 1))}
                                    >
                                        -
                                    </button>
                                </div>
                                <button
                                    onClick={addtocart}
                                    className="w-full bg-dark-green  hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition duration-300 shadow-md active:scale-95"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Cart;