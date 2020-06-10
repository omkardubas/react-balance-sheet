import React from 'react';
import { Nav } from 'react-bootstrap';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    < Nav className="mr-right">
        <Nav.Link onClick={firebase.doSignOut}>Sign Out</Nav.Link>
    </Nav>
);

export default withFirebase(SignOutButton);