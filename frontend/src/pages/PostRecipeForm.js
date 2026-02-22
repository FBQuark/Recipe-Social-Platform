import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const PostRecipeForm = () => {
    const [recipe_name, setRecipeName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [prep_time, setPrepTime] = useState('');
    const [cook_time, setCookTime] = useState('');
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    const navigate = useNavigate();

    const handleSubmit = async(event, recipe_name, instructions, ingredients, cuisineType, prep_time, cook_time) => {
        if (!user) {
            navigate('/Login');
            return;
        }
        event.preventDefault();
        const recipe = {
            user_id: user._id,
            recipe_name: recipe_name,
            instructions: instructions,
            ingredients: ingredients,
            cuisine_type: cuisineType,
            preparation_time: prep_time,
            cooking_time: cook_time
        };
            console.log("recipe",recipe)

        try {
            const createdRecipe = await axios.post('http://localhost:9000/submitRecipe', recipe);
            const savedRecipe = await axios.post('http://localhost:9000/saveRecipe', {
                recipe_id: createdRecipe.data._id,
                user_id: user._id
            }); 

            console.log(savedRecipe);
        } catch(error) {
            console.error(error);
        }

    }

    return(            
            <>
            <Navbar />
                <div className="loginContainer">
                    <form >
                        <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Recipe Name"
                                value={recipe_name}
                                onChange={(e) => setRecipeName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                            <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Instructions"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    rows="12"
                                    required
                            />
                        </div>
                        <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                            <textarea
                            type="text"
                            className="form-control"
                            placeholder="Ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            rows="3"
                            required
                             />
                        </div>
                        <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Cuisine Type"
                                value={cuisineType}
                                onChange={(e) => setCuisineType(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Preparation Time"
                                value={prep_time}
                                onChange={(e) => setPrepTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Cook Time"
                                value={cook_time}
                                onChange={(e) => setCookTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                            <button className="btn btn-secondary" onClick={(e) => {navigate('/Home')}}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={(event) => handleSubmit(event, recipe_name, instructions, ingredients, cuisineType,prep_time, cook_time)}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </>
    );
};

export default PostRecipeForm;