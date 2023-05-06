import React, {useState} from 'react'
import "./navbar.css";
import {Link} from 'react-scroll';
import logo from '../images/cook-e.svg';
import menux from '../images/times.svg';
import menubar from '../images/bars.svg';



function Navbar() {

  const [click, setClick] = useState(false); /* Menu Toggle for Mobile Function*/
  const handleClick = () => setClick(!click);

  return (
    <>
        <div className='navbar'>
          <div className="navbar-container container"> {/* This is the Navbar Component Divisions like Logo and Links*/}
                      
            <Link to='home' className='navbar-logo' duration={800} smooth={true}>{/* This is the Logo Component, imports sourse from images*/}
                <img className='logo'src={logo}  alt=""/>
            </Link>

            <div className='menu-icon' onClick ={handleClick}> {/* This checks if its clicked, if yea, change to closed, if not keep displaying bars*/}
                {click ? <img className='bars-icon' src={menux} alt=""/> : <img src={menubar} alt=""/>}
            </div>
        
          </div>

          <ul className = {click ? 'nav-menu active' : 'nav-menu'}> {/* If menu is active, show css for that, otherwise remain the normal css for menu items*/}

            <li className='nav-item'> {/*  So basically ythis is the links, css is done for all those wjho are not clicked*/}
                <Link to='about' className='nav-links' duration={800} smooth={true} onClick ={handleClick}>
                    about
                </Link>
            </li>


            <li className='nav-item'> {/*  So basically ythis is the links, css is done for all those wjho are not clicked*/}
                <Link to='portfolio' className='nav-links' duration={800} smooth={true}onClick ={handleClick}>
                    portfolio
                </Link>
            </li>
          </ul>

        </div>
    </>
  )
}

export default Navbar