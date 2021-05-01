import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/Context';

const NavBar = (props) => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <Navbar className='navbar' expand="lg" bg="dark" sticky="top" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Happify
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/ranking">
            Ranking
          </Nav.Link>
          <Nav.Link as={Link} to="/search">
            Search
          </Nav.Link>
          <Nav.Link as={Link} to="/factors">
            Factors
          </Nav.Link>
        </Nav>
        <Nav>
          {user?.token ?
            <Nav.Link as={Link} to='/' onClick={() => { setUser(null) }}>
              Logout
            </Nav.Link> : (<>
              <Nav.Link as={Link} to='/register' >
                Register
            </Nav.Link>
              <Nav.Link as={Link} to='/login' >
                Login
            </Nav.Link></>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
