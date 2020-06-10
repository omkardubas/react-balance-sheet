import React, { Component } from 'react';
import { Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';
import '../App/App.scss';

import { FirebaseContext } from '../Firebase';

const SignInPage = () => (
    <div>
        <SignInForm />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    bool: false
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ bool: true });
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        let alertMsg;

        const isInvalid = password === '' || email === '';
        if (this.state.bool) {
            alertMsg = <Alert variant='danger'> {error && <p>{error.message}</p>}</Alert>;
        }

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formGroupEmail" sm={4}>
                    <Form.Label column sm={2}>Email address</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="email" placeholder="Email" name="email" value={this.state.value}
                            onChange={this.onChange} />
                    </Col>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label column md="4">Password</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.value}
                            onChange={this.onChange} />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col sm={4}>
                        <Button variant="primary" type="submit" column="true" sm="2" disabled={isInvalid}>
                            Sign In
                        </Button>
                    </Col>
                </Form.Group>


                <Form.Group>
                    <Col sm={4}>
                        {alertMsg}
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}


const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };