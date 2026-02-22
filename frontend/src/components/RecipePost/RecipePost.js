import React from 'react';
import './RecipePost.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import food1 from './Food/1.jpg';
import food2 from './Food/2.jpg';
import food3 from './Food/3.jpg';
import food4 from './Food/4.jpg';


export const RecipePost = ({ userName, recipeName, hours, minutes, verified, recipeId, saves}) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const food = [food1, food2, food3, food4];
    const randomFood = food[Math.floor(Math.random() * food.length)];
    if(!saves){
        saves = 0;
    }
    const handleSave =  async () => {
        const savedRecipe = {
            recipe_id: recipeId,
            user_id:user._id 
        };
        try {
            const response = await axios.post('http://localhost:9000/saveRecipe', savedRecipe);
            if(response.status === 201){
                saves++;
            }
            console.log(response);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    }

    return (
            <div class="recipe-post-container">
                <img src={randomFood} alt="Recipe"/>
                <Link to={`/Recipe/${recipeId}`}>

                        <div class="info-container">
                            <h1>{userName} {verified && <span class="material-symbols-outlined verified-badge">new_releases</span>}</h1>
                            <h2>{recipeName}</h2>
                            <span><strong>Time:</strong> {hours}hr {minutes} min</span>
                        </div>
                </Link>
                <div className="action-container">
                <span className="material-symbols-outlined save-button" onClick={handleSave}>
                    bookmark
                </span>
                <span className="recipe-number">{saves}</span>
            </div>
            </div>
    );
    
};
