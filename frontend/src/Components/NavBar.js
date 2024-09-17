import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavBar.css';  

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          TrackMate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/PurchaseTracker">Purchase Tracker</Nav.Link>
            <Nav.Link as={Link} to="/TrainingTracker">Training Tracker</Nav.Link>
            <Nav.Link as={Link} to="/RoomTracker">Room Tracker</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
