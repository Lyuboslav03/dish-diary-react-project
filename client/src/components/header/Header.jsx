import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

export default function Header() {
    const {
        isAuthenticated,
        username,
    } = useContext(AuthContext);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className={styles.headerContainer}>
                <Navbar.Brand as={Link} to="/">
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src={logo} alt="Site logo" />
                        <span>Dish Diary</span>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={styles.siteNavbar}>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/all-recipes">All Recipes</Nav.Link>
                        {isAuthenticated && (
                            <div className={styles.user}>
                                <Nav.Link as={Link} to="/add-recipe">Add Recipe</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </div>
                        )}

                        {!isAuthenticated && (
                            <div className={styles.guest}>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}