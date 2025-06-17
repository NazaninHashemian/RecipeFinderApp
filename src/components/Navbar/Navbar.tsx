import React from 'react';
import { GiCook } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { IoIosHeart } from 'react-icons/io';

interface NavbarProps {
    isDarkMode: boolean;
}

const activeHandling = ({ isActive}:{ isActive: boolean}): string => 
    (isActive ? 'active' : ''); 

const Navbar: React.FC<NavbarProps> = ({ isDarkMode }) => {
    
    return (
        <div className="nav">
        <GiCook 
          size={38} 
          color={isDarkMode ? '#fff' : '#ff6347'} 
          style={{ marginRight: 10, marginTop: 5 }} 
          className="hide-on-small"
        />
        <NavLink to="/name" className={activeHandling}>
          <button>Name</button>
        </NavLink>

        <NavLink to="/first-letter" className={activeHandling}>
          <button>First Letter</button>
        </NavLink>

        <NavLink to="/ingredient" className={activeHandling}>
          <button>Ingredient</button>
        </NavLink>

        <NavLink to="/cuisine" className={activeHandling}>
          <button>Cuisine</button>
        </NavLink>

        <NavLink to="/random" className={activeHandling}>
          <button>Random</button>
        </NavLink>

        <NavLink to="/categories" className={activeHandling}>
          <button>Categories</button>
        </NavLink>

      <NavLink to="/favorites" className={activeHandling}>
        <button>
          <IoIosHeart color={isDarkMode ? '#fff' : '#ff6b81'} size={17} />
          <span className="favorite-button-text"> Favorite</span>
        </button>
      </NavLink>

      </div>
    )
}

export default Navbar;