import express from "express";
import Recipe from "../schemas/recipe/Recipe.js";
import Ingredient from "../schemas/recipe/Ingredient.js";
import RecipeRating from "../schemas/recipe/RecipeRating.js";
import User from "../schemas/account/User.js";
import SavedRecipe from "../schemas/account/SavedRecipe.js";
import Admin from "../schemas/account/Admin.js";
import Report from "../schemas/report/Report.js";
import ReportedUser from "../schemas/report/ReportedUser.js";
import ReportedRating from "../schemas/report/ReportedRating.js";
import ReportedRecipe from "../schemas/report/ReportedRecipe.js";
import { ComparePassword} from "../Util/Util.js";
import Verification from "../schemas/account/Verification.js";

const router = express.Router();

export const handleGet = (schema) => {
  return async (req, res) => {
    console.log("GET for ", schema.modelName)
      let data;  
    try {
      switch (schema.modelName) {
        default:
          data = await requireId(req, res);
          if(!data) return;
          console.log(`GET ${schema.modelName}:\n${data}`);
          break;

        case "User":
          console.log(req.query, req.body);
          data = await verifyUser(req, res);
          if(!data) return;
          res.status(await isAdmin(data)).send(data);
          console.log(`GET ${schema.modelName}:\n${data.username}`);
          return;
      }
      res.status(201).send(data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  };
};



const isAdmin = async (user) => {
  const admin = await Admin.findOne({user_id: user._id});
  if (!admin) return 201; else return 200;
}


const verifyUser = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (!username || !password) {
    res.status(400).send({ message: "Missing 'username' or 'password' query parameter" });
    return null;
  }
  const user = await User.findOne({ username: username}).exec();
  if (!user) {
    res.status(400).send({ message: "User not found" });
    return null;
  }

  console.log(user);
  const match = await ComparePassword(password,user.password_hash);
  if (!match) {
    res.status(400).send({ message: "Incorrect password" });
    return null
  }
  const sanitizedUser = user.toObject();
  delete sanitizedUser.password_hash;
  return sanitizedUser;
}




const requireId = async (req, res) => {
  const id = req.query._id;
  if (!id) {
    res.status(400).send({ message: "Missing 'id' query parameter" });
    return null;
  }
  const data = await schema.findById(id).exec();
  if (!data) {
    res.status(404).send({ message: "Data not found" });
    return data;
  }
};


export const handleGetList = (schema) => {
  return async (req, res) => {
    try {
      console.log("GET for ", schema.constructor.name)
      const found_objects = await schema.find();
      let response = [];
      console.log(found_objects);
      for (const object of found_objects) {
        response.push(Object.values(object));
      }
      res.send(response);
      console.log(response);
    } catch (error) {
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  };
};





export const handleGetFrom = (requestedSchema, fromSchema) => {
  return async (req, res) => {
    try {
      console.log(`GET for ${requestedSchema.modelName} from ${fromSchema.modelName}`)
      let found_objects;
      let response = [];

      switch (fromSchema) {
        case User:
          if(requestedSchema === SavedRecipe){
              const savedRecipes = await requestedSchema.find({user_id: req.query.user_id});
              const recipeIds = savedRecipes.map(savedRecipe => savedRecipe.recipe_id);
              found_objects = await Recipe.find({ _id: { $in: recipeIds } });
              response.push(found_objects);
              console.log("Found Posts: ", found_objects.length);
          }else{
            found_objects = await requestedSchema.findById(req.query._id);
          }
          break;
        case Recipe:
          console.log(req.query._id);
          found_objects = await requestedSchema.findById(req.query._id);
          response.push(found_objects);
          break;
        case SavedRecipe:
          found_objects = await requestedSchema.find({user_id: req.query._id});
          break;
        case Report:
          found_objects = await requestedSchema.find({report_id: req.body._id});
          break;
        case Ingredient:
          found_objects = await requestedSchema.find({ingredient_id: req.body._id});
          break;
        default:
          throw new Error("requested fromSchema is not supported/needed!");
      }
      // console.log(response, found_objects);
      res.send(response);
    } catch (error) {
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  };
};


function handleGetUserById(schema) {
  return async (req, res) => {
    try {
      console.log(`GET for ${schema.modelName} from User`)
      const user_id = req.query._id;
      if (!user_id) {
        res.status(400).send({ message: "Missing 'user_id' query parameter" });
        return;
      }
      let found_objects = await schema.findById(user_id);
      found_objects.password_hash = undefined;
      res.send(found_objects);
    } catch (error) {
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  };
}

function handleGetRecipeById(schema) {
  return async (req, res) => {
    try {
      console.log(`GET for ${schema.modelName} from recipe`)
      const recipe_id = req.query._id;
      if (!recipe_id) {
        res.status(400).send({ message: "Missing 'user_id' query parameter" });
        return;
      }
      const foundRecipe = await schema.findById(recipe_id);
      console.log(foundRecipe);
      res.send(foundRecipe);
    } catch(error) {
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  }
}

// requestedSchema is what kind of object you want and fromSchema is what object your trying to get it from
//    for example getting all of a user's ratings would be
//    handleGetFrom(requestedSchema: RecipeRating, fromSchema: User)
//    and then the code will try to find all RecipeRatings with the user_id of the _id in the req.body

router.get(`/getIngredient`, handleGet(Ingredient));
router.get(`/getRating`, handleGet(RecipeRating));
router.get(`/getUser`, handleGet(User));
router.get(`/getSavedRecipe`, handleGet(SavedRecipe));
router.get(`/getAdmin`, handleGet(Admin));

// gets EVERY element out of the database of this "type"
router.get(`/getAdmins`, handleGetList(Admin));
router.get(`/getUsers`, handleGetList(User));
router.get(`/getIngredients`, handleGetList(Ingredient));
router.get(`/getRecipes`, handleGetList(Recipe));
router.get(`/getReports`, handleGetList(Report));
router.get(`/getVerifications`, handleGetList(Verification));

// gets elements referenced from another
router.get(`/getRatingsFromUser`, handleGetFrom(RecipeRating, User));
router.get(`/getUsersFromRecipe`, handleGetFrom(User, Recipe));
router.get(`/getSavedRecipesFromUser`, handleGetFrom(SavedRecipe, User));
router.get(`/getReportedUserFromRating`, handleGetFrom(ReportedUser, Report));
router.get(`/getReportedRatingFromRating`, handleGetFrom(ReportedRating, Report));
router.get(`/getReportedRecipeFromRating`, handleGetFrom(ReportedRecipe, Report));



// not following paradigm of get requests
router.get(`/getUserById`, handleGetUserById(User));
router.get(`/getRecipeById`, handleGetRecipeById(Recipe));







export default router;
