import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import MessageService from '../services/message_service'

const message_service = new MessageService()

function SearchMessage(props){
    const [ search, setSearch ] = useState('')
    const [ messages, setMessages ] = useState([])
    const me = JSON.parse(localStorage.user)

    function handleChangerSearch(e){
        setSearch(e.target.value)
        message_service.list({ search: e.target.value, member: me.uuid})
        .then(messages => setMessages(messages.data))
    }

    function handleChooseMessage(message){
        return () => {
            setSearch("")
            setMessages([])
            props.onMessageChoose(message)
        }
    }

    return (
        <Modal show={props.show} onHide={ props.onHide }>
                <Modal.Header closeButton>
                    <Modal.Title>Search conversation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicSearch">
                        <Form.Label>Search in all rooms</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Search..." 
                            value={search}
                            onChange={ handleChangerSearch }
                        />
                    </Form.Group>
                    <ListGroup style={{position:'absolute', marginTop: -18, width: 'calc(100% - 32px)'}}>
                        {( messages.map( message => (
                            <ListGroup.Item style={{ cursor: 'pointer' }} onClick={ handleChooseMessage(message) }>
                                <Card.Body>
                                    <Card.Title>{ message.alias }</Card.Title>
                                    <Card.Text>{ message.message }</Card.Text>
                                </Card.Body>
                            </ListGroup.Item>
                        )) )}
                    </ListGroup>
                </Modal.Body>
            </Modal>
    )
}

export default SearchMessage