import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'; 
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import logo from '../images/TrackmateLogo.png'; // Correct logo path

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm p-3 mb-4">
      <Container>
        {/* Brand and Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={logo} 
            alt="TrackMate Logo" 
            width="40" 
            height="40" 
            className="d-inline-block align-top me-2" 
          />
          <span className="fs-4 fw-bold">TrackMate</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links next to TrackMate logo */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4"> {/* Adding margin start to push links next to logo */}
            <Nav.Link as={Link} to="/PurchaseTracker" className="mx-2">Purchase Tracker</Nav.Link>
            <Nav.Link as={Link} to="/TrainingTracker" className="mx-2">Training Tracker</Nav.Link>
            <Nav.Link as={Link} to="/RoomTracker" className="mx-2">Room Tracker</Nav.Link>
          </Nav>

          {/* Account Icon aligned to the right */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
              <FaUserCircle size={30} className="me-2" /> {/* User icon */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
