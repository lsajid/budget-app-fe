import React from 'react';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
function NavBar() {
  return (
    <nav className='nav'>
        
        <img style={{height: "50px", borderRadius:"10px"}}src="https://previews.123rf.com/images/saphatthachat/saphatthachat1803/saphatthachat180300092/97119970-vector-pixel-art-pig-isolated-cartoon.jpg" alt="piggy"/>
        <h1 className='project-name'><PriceCheckIcon/>Budget-App </h1>
        <h4 className='link'>
            <Link to="/transactions/new"> <AddIcon/>Add New</Link>
        </h4>
    </nav>
  );
};

export default NavBar;