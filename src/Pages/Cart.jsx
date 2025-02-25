import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Cart() {
    const [recipes, setRecipes] = useState([]);
    const [count, setCount] = useState(0)
    const { productId } = useParams('');
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
        const getData = JSON.parse(localStorage.getItem('cart')) || []
        getData.push(recipes);
        let exesting = getData.find(item => item.id === recipes.id);
        if (exesting) {
            exesting.quantity += count + 1;
        }
        localStorage.setItem('cart', JSON.stringify(getData));
    }
    return (
        <div>

            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <img src={recipes.image} alt={recipes.name} className="w-100 h-auto rounded-md" />
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-2xl font-bold mb-2">Title: {recipes.name}</h1>
                        <p className="text-gray-600 mb-2">Cuisine: {recipes.cuisine}</p>
                        <p className="text-gray-700 mb-2">Cooking Time: {recipes.cookTimeMinutes} mins</p>
                        <p className="text-gray-700 mb-2">Rating: ⭐ {recipes.rating}</p>
                        <div>rater: {recipes.rating?.count}
                            <button className="bg-[#66785F] hover:bg-red-600 px-2 text-white" onClick={() => setCount((c) => (c + 1))}>+</button>
                            <input className='bg-slate-600 outline-0 w-10' type="number" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} />
                            <button className="bg-red-500 hover:bg-red-600 px-2 text-white" onClick={() => setCount((c) => Math.max(1, c - 1))}>-</button>
                        </div>
                        <button
                            onClick={addtocart}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors mt-4"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart