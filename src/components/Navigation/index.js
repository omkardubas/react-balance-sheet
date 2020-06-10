import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import SignOutButton from '../SignOut';
import '../App/App.scss';

import * as ROUTES from '../constants/routes';



const Navigation = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={ROUTES.HOME}>App</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
            <Nav.Link href={ROUTES.SIGN_UP}>Sign Up</Nav.Link>
            <Nav.Link href={ROUTES.ACCOUNT}>Account</Nav.Link>
            <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
        </Form>
        < Nav className="mr-right">
            <SignOutButton />
        </Nav>
    </Navbar >
);

export default Navigation;