import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

export default function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className={styles.headerContainer}>
                <Navbar.Brand href="/">
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src={logo} alt="Site logo" />
                        <span>Dish Diary</span>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={styles.siteNavbar}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/all-recipes">All Recipes</Nav.Link>
                        <Nav.Link href="/add-recipe">Add Recipe</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}