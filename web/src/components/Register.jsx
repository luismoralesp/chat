import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import UserService from '../services/user_service';

const style = {
    border: 'solid #dfdfdf 4px',
    borderRadius: '4px',
    maxWidth: '400px',
    padding: '16px',
    marginTop: '100px'
}

const user_service = new UserService(false)

function Register() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ alias, setAlias ] = useState('')

    function handleChangeEmail(e){
        setEmail(e.target.value)
    }

    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    function handleChangeConfirmPassword(e){
        setConfirmPassword(e.target.value)
    }

    function handleChangeAlias(e){
        setAlias(e.target.value)
    }

    function handleSubmit(e){
        if (password !== confirmPassword){
            alert("Passwords not match!")
        } else {
            user_service.create({
                email, password, alias
            })
            .then(resp => {
                window.location.replace("/login")
            })
            .catch(err => {
                const data = err.response.data
                console.log(data)
                if (data.code === 11000){
                    const key = Object.keys(data.keyValue)[0]
                    alert(`The ${key} '${data.keyValue[key]}' already exisit!`)
                }
            })
        }
        e.preventDefault()
        
        //e.stopPropagation()
    }

    return (
        <Container style={style}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={ handleChangeEmail }
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={ handleChangePassword }
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={confirmPassword}
                        onChange={ handleChangeConfirmPassword }
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Alias</Form.Label>
                    <Form.Control 
                        type="test" 
                        placeholder="Alias" 
                        value={alias}
                        onChange={ handleChangeAlias }
                        required
                    />
                </Form.Group>
                <Button 
                    variant="primary"
                    type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Register