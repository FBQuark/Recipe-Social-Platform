import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/Profile' element={<Profile />}/>
        <Route path='/CommunityGuidelines' element={<CommunityGuidelines />}/>
        <Route path='/PostRecipeForm' element={<PostRecipeForm />}/>
        <Route path='/AdminHome' element={<AdminHome />}/>
        <Route path='/VerifiedApplication' element={<VerifiedApplication />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
