import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For Bootstrap's JavaScript

//Page Imports
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home/Home';
import Profile from './pages/Profile';
import CommunityGuidelines from './pages/CommunityGuidelines';
import PostRecipeForm from './pages/PostRecipeForm';
import AdminHome from './pages/Admin/AdminHome';
import VerifiedApplication from './pages/VerifiedApplication';
import RecipeSearchPage from './pages/RecipeSearchPage';
import ReportRecipe from './pages/ReportRecipe/ReportRecipe';
import Recipe from './pages/Recipe/Recipe';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/SignUp' element={<SignUp />}/>
      <Route path='/Home' element={<Home />}/>
      <Route path='/Profile' element={<Profile />}/>
      <Route path='/CommunityGuidelines' element={<CommunityGuidelines />}/>
      <Route path='/PostRecipeForm' element={<PostRecipeForm />}/>
      <Route path='/Search/:name' element={<RecipeSearchPage />}/>
      <Route path='/ReportRecipe/:recipeId' element={<ReportRecipe />}/>
      <Route path='/AdminHome' element={<AdminHome />}/>
      <Route path='/Recipe/:recipeId' element={<Recipe />}/>
      <Route path='/VerifiedApplication' element={<VerifiedApplication />}/>
    </>
  )
)

root.render(
  <React.StrictMode>
    <RouterProvider router = {router}>
      <div className='body'>
      <App />
      </div>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
