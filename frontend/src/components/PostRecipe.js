import React from "react";
import { useNavigate } from "react-router-dom";

export const PostRecipe = () => {

    const navigate = useNavigate();

    return(
        <div className="postRecipeBanner"> 
            <button className="btn btn-primary my-2 my-sm-0 postRecipeButton" onClick={(event) => navigate('/PostRecipeForm')}>
                <img src="/images/add.png" width="30" height="30" alt="Post Recipe"/>
            </button>
        </div>   
    );
};