import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import firebase from '../Firebase/firebase'
import * as ROUTES from '../constants/routes';
import '../App/App.scss';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpPage = () => (
    <div>
        <SignUpForm />
    </div>
);


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };

        this.handleChange = this.handleChange.bind(this);
    };

    onSubmit = event => {
        const { email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        const isInvalid =
            this.state.passwordOne !== this.state.passwordTwo ||
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.username === '';

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="name" sm={4}>
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="name" name="username" placeholder="Name" value={this.state.value}
                                onChange={this.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail" sm={4}>
                        <Form.Label column sm={2}>Email address</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="email" name="email" placeholder="Email" value={this.state.value}
                                onChange={this.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label column md="4">Password</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="password" name="passwordOne" placeholder="Password" value={this.state.value}
                                onChange={this.handleChange} />
                        </Col>
                        <Form.Label column md="4">Confirm Password</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="password" name="passwordTwo" placeholder="Confirm Password" value={this.state.value}
                                onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Col sm={4}>
                            <Button variant="primary" type="submit" column="true" sm="2" disabled={isInvalid}>
                                Sign Up
                            </Button>
                        </Col>
                    </Form.Group>
                    {this.state.error && <p>{this.state.error.message}</p>}
                </Form>
            </div>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };