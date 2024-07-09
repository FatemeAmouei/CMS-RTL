import React, { useContext } from  'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MdBrightness2 } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { ThemeContext } from '../Context/ThemeContext';
import './Navbar.css'
import { NavLink } from "react-router-dom";

function NavbarRTL() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`navbar-content ${theme}`}>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className='navbar-right'>
            <img src="./img/p.jpg" alt="profile img" className='profile-img' />
            <div className='profile-info'>
              <p className={`profile-info__title ${theme}`}>فاطمه عموئی</p>
              <p className="profile-info__subtitle">برنامه نویس فرانت اند</p>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className='nabvar-left'>
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll ></Nav>
            <Form className={`d-flex navbar-left ${theme}`}>

              <Button variant="outline-primary" className={`navbar-left__btn ${theme}`} onClick={toggleTheme}>
                {theme === 'light' ? <MdBrightness2 className={`navbar-icons ${theme}`}/> : <BsFillBrightnessHighFill className={`navbar-icons ${theme}`}/> }
              </Button>

              <NavLink to="/Login" className='navlink-login__btn'>
                <IoLogOutSharp className={`navbar-icons navlink-icon ${theme}`}/>
              </NavLink>

            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarRTL;