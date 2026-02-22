import React, { useEffect } from 'react';
import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import { Navbar } from '../../components/Navbar';
import { PostRecipe } from '../../components/PostRecipe';
import { RecipePost } from '../../components/RecipePost/RecipePost';   

const Home = () => {

    const [recipes, setRecipies] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:9000/getRecipes');
                const fetchedRecipes = response.data;
                setRecipies(fetchedRecipes);
                console.log('Fetched recipes:', fetchedRecipes);
                const userPromises = fetchedRecipes.map(async (recipe) => {
                    try {
                        const userResponse = await axios.get('http://localhost:9000/getUsersFromRecipe', {
                            params: { _id: recipe[2].user_id },
                        });
                        console.log('User response:', userResponse);
                        recipe[2].user_name = userResponse.data[0].username;
                        recipe[2].status = userResponse.data[0].status;
                    } catch (error) {
                        console.error('Error fetching user:', error);
                        return null; 
                    }
                });

                const fetchedUsers = await Promise.all(userPromises);
                setUsers(fetchedUsers.filter((user) => user !== null)); 

            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        getRecipes();
    }, []);

    return(
    <>
        <Navbar />
        <PostRecipe />
        <div class="home-container">
            <div class="recipe-posts-container">
                {recipes.map((recipe) => {
                    console.log('Recipe:', recipe);
                    return <RecipePost 
                        userName={recipe[2].user_name}
                        recipeName={recipe[2].recipe_name} 
                        hours={recipe[2].preperation_time} 
                        minutes={recipe[2].cooking_time}
                        verified={recipe[2].status}
                        recipeId={recipe[2]._id}
                        userId={recipe[2].user_id}
                        saves={recipe[2].saves}
                    />
                }
                )}
            </div>
        </div>
    </> 
    );
}

export default Home;