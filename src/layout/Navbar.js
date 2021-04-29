import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
* @author
* @function NavBar
**/

const NavBar = (props) => {
    return (
        <Navbar expand='lg' bg='dark' sticky='top' variant="dark">
            <Navbar.Brand as={Link} to='/'>React App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="mr-auto">
                <Nav.Link as={Link} to='/ranking'>
                    Ranking
                    </Nav.Link>
                <Nav.Link as={Link} to='/search'>
                    Serach
                    </Nav.Link>
                <Nav.Link as={Link} to='/factors'>
                    Factors
                    </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link as={Link} to='/login' >
                    Login
                </Nav.Link>
                <Nav.Link as={Link} to='/' >
                    Logout
                </Nav.Link>
                <Nav.Link as={Link} to='/register' >
                    Register
                </Nav.Link>
            </Nav>
        </Navbar>
    )

}

export default NavBar