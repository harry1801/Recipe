import { useState } from "react";
import axios from 'axios';

import useGetUserID from '../src/useGetUserID';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

const CreateRecipe = () => {
  const [cookies,] = useCookies(["access_token"]);
  const userID=useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate =useNavigate();
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

 

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients});
  };

  const addIngredient = (event) => {
    event.preventDefault();
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/recipes", recipe,{ headers: { authorization: cookies.access_token }});
      console.log(response); // Check the response here
      alert("Recipe Created");
      navigate("/")
    } catch (error) {
      console.error(error);
      alert("Failed to create recipe. Please try again.");
    }
  };
  
  


  return (
    <div className="create-recipe">
      <h1>Create Recipe</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients" >Ingredients:</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
           
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <button onClick={addIngredient}>Add Ingredient</button>

        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking Time:</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create  Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
