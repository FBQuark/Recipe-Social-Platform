import React, { useEffect } from "react";

import { Navbar } from '../components/Navbar';
import { PostRecipe } from '../components/PostRecipe';
import { useState } from "react";
import axios from "axios";
import '../styles/Profile.css';
import { RecipePost } from "../components/RecipePost/RecipePost";

const Profile = () => {
    const [userRecipes, setUserRecipes] = useState([]);
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getSavedRecipesFromUser", {
                    params: { user_id: user._id },
                });
                const fetchedRecipesArray = response.data;
                const allRecipes = fetchedRecipesArray.flat();
                const recipesWithUserNames = await Promise.all(
                    allRecipes.map(async (recipe) => {
                        try {
                            const userResponse = await axios.get("http://localhost:9000/getUsersFromRecipe", {
                                params: { _id: recipe.user_id }, 
                            });
                            recipe.user_name = userResponse.data[0]?.username || "Unknown User"; 
                            recipe.status = userResponse.data[0]?.status || false;
                        } catch (error) {
                            console.error("Error fetching user for recipe:", recipe._id, error);
                            recipe.user_name = "Unknown User"; 
                        }
                        return recipe;
                    })
                );

                setUserRecipes(recipesWithUserNames);
                console.log("Recipes with user names:", recipesWithUserNames);
            } catch (error) {
                console.error("Error fetching user recipes:", error);
            }
        };

        fetchRecipes();
    }, [user._id]);

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <Tabs userRecipes={userRecipes} user={user} /> 
            </div>
        </div>
    );
};

const Tabs = ({ userRecipes:userRecipes, user:user }) => {
    const [activeTab, setActiveTab] = useState("myPosts");

    return (
        <div className="tabs-container">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === "myPosts" ? "active" : ""}`}
                    onClick={() => setActiveTab("myPosts")}
                >
                    My Post
                </button>
                <button
                    className={`tab ${activeTab === "savedPosts" ? "active" : ""}`}
                    onClick={() => setActiveTab("savedPosts")}
                >
                    Saved Posts
                </button>
            </div>

            <div className="recipes-container">
                {activeTab === "myPosts" ? (
                    createdRecipes(userRecipes, user._id)
                ) : (
                    savedRecipes(userRecipes)
                )}
            </div>
        </div>
    );
};

const createdRecipes = (userRecipes, userId) => {
    const userCreatedRecipes = userRecipes.filter((recipe) => recipe.user_id === userId);

    return (
        <div className="recipes-section">
            <h3>My Posts</h3>
            {userCreatedRecipes.length > 0 ? (
                userCreatedRecipes.map((recipe) => (
                    <RecipePost
                        key={recipe._id}
                        userName={recipe.user_name}
                        recipeName={recipe.recipe_name}
                        hours={recipe.preparation_time}
                        minutes={recipe.cooking_time}
                        verified={recipe.status}
                        recipeId={recipe._id}
                        userId={recipe.user_id}
                        saves={recipe.saves}
                    />
                ))
            ) : (
                <p>No posts created by you yet.</p>
            )}
        </div>
    );
};

const savedRecipes = (userRecipes) => {
    return (
        <div className="recipes-section">
            <h3>Saved Posts</h3>
            {userRecipes.length > 0 ? (
                userRecipes.map((recipe) => (
                    <RecipePost
                        key={recipe._id}
                        userName={recipe.user_name}
                        recipeName={recipe.recipe_name}
                        hours={recipe.preparation_time}
                        minutes={recipe.cooking_time}
                        verified={recipe.status}
                        recipeId={recipe._id}
                        userId={recipe.user_id}
                        saves={recipe.saves}
                    />
                ))
            ) : (
                <p>No saved recipes found.</p>
            )}
        </div>
    );
};


export default Profile;