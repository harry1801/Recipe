import {useEffect, useState} from "react";
import axios from "axios";
import useGetUserId from "./useGetUserID"
import {useCookies} from "react-cookie"
const Home=()=>{
    const [recipes,setRecipes]=useState([]);
    const[savedRecipes,setSavedRecipes]=useState([]);
    const [cookies,] = useCookies(["access_token"]);
    const userID =useGetUserId();
    useEffect(()=>
    {
            const fetchRecipe=async()=>{
                try {
                    const response = await axios.get("http://localhost:3001/recipes");
                    setRecipes(response.data)
                    
                  } catch (error) {
                    console.error(error);
                  }
            };

            const fetchSavedRecipe=async()=>{
                try {
                    const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                    // setRecipes(response.data)
                    setSavedRecipes(response.data.savedRecipes)
                  } catch (error) {
                    console.error(error);
                  }
            };
            fetchRecipe();
            if(cookies.access_token){
            fetchSavedRecipe();
            }
    },[userID, cookies.access_token]);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/recipes", 
                { recipeID, userID },
                { headers: { authorization: cookies.access_token } }
            );
    
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.error("Error saving recipe:", error.response ? error.response.data : error.message);
        }
    };
    

    const isRecipeSaved=(id)=>savedRecipes.includes(id);
    return (
        <div>
            <h1>Recipes</h1>
                <ul>
                    {recipes.map((recipe)=>(<li key={recipe._id}>
                        {/* {savedRecipes.includes(recipe._id) && <h1>Already saved </h1>} */}
                        <div>
                            <h2>
                                {recipe.name}
                            </h2>
                            <button onClick={()=>saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}>
                                    {isRecipeSaved(recipe._id)?"Saved":"Save"}</button>
                        </div>
                        <div className="ingredients">
    <h3>Ingredients:</h3>
    <ul>
        {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ))}
    </ul>
</div>

<div className="instructions">
    <h3>Instructions:</h3>
    <p>{recipe.instructions}</p>
</div>

                        
                        <div>
                            <img src={recipe.imageURL} alt={recipe.name}>
                            </img>
                            <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
                        </div>
                    </li>))}
                </ul>
            
        </div>
    )
}

export default Home;