import React, { useState, useEffect } from "react";
import "./Recipe.scss"; // Import your CSS file
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Recipe = () => {
    const { recipeId } = useParams();
    const [showInstructions, setShowInstructions] = useState(true);
    const [showRecipe, setShowRecipe] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        // Fetch data
        const getRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getRecipes");
                for (let i = 0; i < response.data.length; i++) {
                    console.log(recipeId); 

                    if (response.data[i][2]._id === recipeId) {
                        setRecipe(response.data[i][2]);
                        break;
                    }
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        }
        getRecipe();
    }, [recipeId]);   

    return (
        <div className="recipe-card">
        {/* Header */}
        <div className="header">
            <Link to={`/ReportRecipe/${recipeId}`} className="flag-btn"><span class="material-symbols-outlined">flag</span></Link>
            <Link to= "/home" className="close-btn"><span class="material-symbols-outlined">close</span></Link>
        </div>{console.log(recipeId)}

        {/* Main Section */}
        <div className="main-section">
            <div className="profile-picture">
                <img src="https://via.placeholder.com/150" alt="Profile" />
            </div>
            <div className="recipe-details">
                <h2>{recipe.recipe_name}</h2>
                <p> Prep Time: {recipe.preparation_time} mins | Cook Time: {recipe.cooking_time} mins</p>
            </div>
        </div>

        {/* Collapsible Sections */}
        <div className="collapsible-section">
            {/* Instructions */}
            <div className="section">
                <button  button
                    className="section-header"
                    onClick={() => setShowInstructions(!showInstructions)}
                >
                    Instructions
                </button>
                {showInstructions && <div className="section-content" style={{whiteSpace: "pre-wrap"}}>{recipe.instructions}</div>}
            </div>

            {/* Cuisine Type*/}
            <div className="section">
            <button  
                className="section-header"
                onClick={() => setShowRecipe(!showRecipe)}
            >
                Cuisine Type
            </button>
            {showRecipe && (
                <div className="section-content">
                    <p>{recipe.cuisine_type}</p>
                </div>
            )}
            </div>


           
        </div>
        </div>
    );
    };

export default Recipe;
