import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import logo2 from '../../images/logo.png'
import { MyContext } from '../../App';
const Header = (props) => {
  const [loggedIn,setLoggedIn] = useContext(MyContext);
    return (
      <nav className='nav' style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        color:`${props.color}`,
        height:'50px',
        padding:"5px 20px" ,

     }}>
          <div>
          <Link to='/'className="navbar-brand">
                  <img style={{height:"40px",background:'white'}} src={props.img || logo2} alt="" />
          </Link>
        </div>
        <div className='search-bar'>
        <input type="text" className="input" placeholder="Search place" />
            <button className="search-btn btn btn-danger btn-rounded">search</button>
        </div>
        <div className="header-right" style={{display: 'flex',alignItems:"center"}}>
            <Link to='/news'  style={{textDecoration:"none", color:`${props.color}`}}><p>News</p></Link>
            <Link to='/booking/destination'  style={{textDecoration:"none", color:`${props.color}`}}><p>Destination</p></Link>
            <Link to='/blog'  style={{textDecoration:"none", color:`${props.color}`}}><p>Blog</p></Link>
            <Link to='/contact'  style={{textDecoration:"none", color:`${props.color}`}}><p>Contact</p></Link>
            <Link to='/login'  style={{textDecoration:"none"}}>
              <button size="small" style={{background:"orange", color:"black",border:'2px solid orange',borderRadius:"3px"}}>Log in</button>
              {/* {loggedIn ? 
              <button type="" onClick={(e) =>{setLoggedIn(!loggedIn)}}>Log out</button> : 
              <button type="" onClick={(e) =>{setLoggedIn(!loggedIn)}}>Log in</button>} */}
            </Link>
        </div>
       
      </nav>
    );
};

export default Header;