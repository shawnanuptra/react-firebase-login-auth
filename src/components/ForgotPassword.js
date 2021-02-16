import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const[error, setError] = useState('');
    const[message, setMessage] = useState('');

    const[loading, setLoading] = useState(false);

    //triggered when submit button is pressed, aka submit event is triggered
    async function handleSubmit(e){

        //prevents form from refreshing
        e.preventDefault();

        
        try {
            setMessage('');
            //resets the error State, if there has been a previous error
            setError('');
            setLoading(true);
            //sign up using the current values of each Ref (field)
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError('Failed to reset password');
        }
        
        setLoading(false);
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            {/* type is the type of text field/control */}
                            {/* ref is like "name" in HTML forms, used to get the information from the form when the form is submitted */}
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                       
                        {/* If the loadingState is true, button will be disabled */}
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log in</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}
