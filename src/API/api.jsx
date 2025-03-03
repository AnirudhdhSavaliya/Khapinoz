import axios from "axios";


const api = axios.create({
    baseURL:'https://dummyjson.com',
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
    },
});

const apiServices = {
    getRecipes:()=>api.get('/recipes')
};
export default apiServices;
