import {useEffect, useState} from "react";
import axios from "axios";
import useGetUserId from "./useGetUserID"
const SavedRecipes=()=>{
    const[savedRecipes,setSavedRecipes]=useState([]);
    const userID =useGetUserId();
    useEffect(()=>
    {
            

            const fetchSavedRecipe=async()=>{
                try {
                    const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                    // setRecipes(response.data)
                    setSavedRecipes(response.data.savedRecipes)
                    
                  } catch (error) {
                    console.error(error);
                  }
            };
            
            fetchSavedRecipe();
    },[userID]);

    
    return (
        <div>
            <h1>Saved Recipes</h1>
                <ul>
                    {savedRecipes.map((recipe)=>(<li key={recipe._id}>
                        {savedRecipes.includes(recipe._id) && <h1>Already saved </h1>}
                        <div>
                            <h2>
                                {recipe.name}
                            </h2>
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
                            <p>Cooking Time :{recipe.cookingTime}   (minutes)</p>
                        </div>
                    </li>))}
                </ul>
            
        </div>
    )
}

export default SavedRecipes;