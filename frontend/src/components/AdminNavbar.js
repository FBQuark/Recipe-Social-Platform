import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminNavbar = () => {

const navigate = useNavigate();

const signOut = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/Login");
}

    return(
        <nav className="navbar navbar-light" style={{backgroundColor: '#D21F3C'}}>
        <a className="navbar-brand" href="/AdminHome">
            <div className="navbar-home">
                <img src="/images/home.png" width="30" height="30" alt="HomeButton" />
            </div>  
        </a>
        <div className="nav-item">
            <h1>Admin Home</h1>
        </div>
            <div className="nav-item"> 
                <button className="btn btn-secondary" onClick={(event) => {signOut(event)}}>
                    Sign Out
                </button>
            </div>
        </nav>
    );
};
