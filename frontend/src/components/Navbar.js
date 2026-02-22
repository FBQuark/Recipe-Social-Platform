import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); //opens or closes the dropdown menu
    }


    return(
        <nav className="navbar navbar-light" style={{backgroundColor: '#D21F3C'}}>
        <a className="navbar-brand" href="/Home">
            <div className="navbar-home">
                <img src="/images/home.png" width="30" height="30" alt="HomeButton" />
            </div>  
        </a>
        <div className="navbar-search">
            <input  className="form-control"  type="search"  placeholder="Search Recipes..."  aria-label="Search"  style={{margin: '0px 5px 0px 0px'}}  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}   />
                <Link className="btn btn-secondary my-2 my-sm-0"  to={`/search/${searchQuery}`}>Search</Link>
            </div>
            <div className="navbar-profile nav-item dropdown"> {/* Dropdown Menu Begin Here */}
                <button 
                    className="nav-link dropdown-toggle btn btn-link" 
                    onClick={toggleDropdown}
                    aria-haspopup="true" 
                    aria-expanded={dropdownOpen}
                    style={{padding: 0, border: 'none', background: 'none'}} >
                    <img src="/images/user.png" width="30" height="30" alt="HomeButton" />
                </button>
              {dropdownOpen && (
                   <div className="dropdown-menu show" style={{position: "absolute", zIndex: 1050, left: 'auto', right: '0%'}}>
                        <a className="dropdown-item" href="/Home">
                            Home
                        </a>
                        <a className="dropdown-item" href="/Profile">
                            Profile
                        </a>
                        <a className="dropdown-item" href="/VerifiedApplication">
                            Apply for Verification
                        </a>
                        <a className="dropdown-item" href="/CommunityGuidelines">  
                            Community Guidelines
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/Login">
                            Sign Out
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};
