import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className='nav'>
        <h1 className='title'>Budget-App</h1>
        <div className='link-names'> 
            <h4 className=''>
                <Link to="/transactions/new"> New </Link>
            </h4>
        </div>
    </nav>
  );
};

export default NavBar;