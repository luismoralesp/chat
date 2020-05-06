import React, { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ImageService from '../services/image_service'
import UserService from '../services/user_service'
import RoomService from '../services/room_service'
import logo from '../logo.svg'

const user_service = new UserService()
const image_service = new ImageService()
const room_service = new RoomService()

function NewGroup(props){
    const [alias, setAlias ] = useState("")
    const [members, setMembers ] = useState([])
    const [search, setSearch ] = useState("")
    const [users, setUsers ] = useState([])
    const me = JSON.parse(localStorage.user)

    function handleChangerAlias(e){
        setAlias(e.target.value)
    }

    function handleChangerSearch(e){
        setSearch(e.target.value)
        user_service.list({ search: e.target.value })
        .then(users => setUsers(users.data))
    }

    function handleChooseUser(user){
        return (e) => {
            if (user.uuid != me.uuid && !members.filter(m => m.uuid === user.uuid).length){
                setMembers([ ...members, user ])
            }
            setSearch("")
            setUsers([])
        }
    }

    function handleSubmit(){
        console.log("????")
        if (!alias){
            alert("Choose an alias")
            return
        }
        if (!members.length){
            alert("Add at least a member")
            return
        }
        const members_uuid = members.map(m => m.uuid)
        room_service.create({
            alias, members: [ ...members_uuid, me.uuid]
        }).then(() => {
            props.onHide()
        })
    }

    return (
        <Modal show={props.show} onHide={ props.onHide }>
                <Modal.Header closeButton>
                    <Modal.Title>Create new group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicAlias">
                        <Form.Label>Alias:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="A cool alias..." 
                            value={alias}
                            onChange={ handleChangerAlias }
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicMembers">
                        <Form.Label>Members:</Form.Label>
                        <Card.Body style={{ padding: 2}}>
                        { members.map( member => (
                            <Badge variant="light" style={{ margin: 2}}>
                                <Row>
                                    <Col xs={6}>
                                        <Image 
                                            style={{ width: 30, height: 30}} 
                                            src={ member.photo?image_service.parse(member.photo):logo } 
                                            roundedCircle />
                                    </Col>
                                    <Col style={{ padding: 5 }}>
                                        { member.alias }
                                    </Col>
                                </Row>
                            </Badge>
                        ))}
                        </Card.Body>
                    </Form.Group>
                    <Form.Group controlId="formBasicSearch">
                        <Form.Label>Search by alias:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Search..." 
                            value={search}
                            onChange={ handleChangerSearch }
                        />
                    </Form.Group>
                    <ListGroup style={{position:'absolute', marginTop: -18, width: 'calc(100% - 32px)'}}>
                        {( users.map( user => (
                            <ListGroup.Item style={{ cursor: 'pointer' }} onClick={ handleChooseUser(user) }>
                                <Row>
                                    <Col xs={3} style={{ paddingRight: 0 }}>
                                        <Image 
                                            style={{ width: 50, height: 50}} 
                                            src={ user.photo?image_service.parse(user.photo):logo } 
                                            roundedCircle />
                                    </Col>
                                    <Col style={{ paddingLeft: 0, textAlign: 'left' }}>
                                        { user.alias }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )) )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ handleSubmit } variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
    )
}

export default NewGroup