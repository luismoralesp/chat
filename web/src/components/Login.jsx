import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AuthService from '../services/auth_service';

const style = {
    border: 'solid #dfdfdf 4px',
    borderRadius: '4px',
    maxWidth: '400px',
    padding: '16px',
    marginTop: '100px'
}

const auth_service = new AuthService()

function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    function handleChangeEmail(e){
        setEmail(e.target.value)
    }

    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    function handleSubmit(e){
        auth_service.login(email, password)
        .then(resp => {
            localStorage.setItem('token', (resp.data.token))
            localStorage.setItem('user', JSON.stringify(resp.data.user))
            auth_service.updateNextTime()
            window.location.replace("/")
        })
        .catch(err => console.log((err)))
    }

    return (
        <Container style={style}>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={ handleChangeEmail }
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={ handleChangePassword }
                    />
                </Form.Group>
                <Button 
                    variant="primary"
                    type="button"
                    onClick={ handleSubmit }
                    >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Login