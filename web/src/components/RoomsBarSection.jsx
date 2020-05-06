import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import ImageService from '../services/image_service'
import logo from '../logo.svg'

const style = {
}

const image_service = new ImageService()

function ChatBarSection(props) {
    localStorage.room = props.room
    
    function handleChooseRoom(room){
        return () => props.onChooseRoom(room)
    }
    
    return (
        <Accordion defaultActiveKey="0" >
            <Accordion.Toggle as={Button} style={{ width: 'calc(100% - 20px)'}} variant="link" eventKey="0">
                <Row>
                    <Col style={{ textAlign: 'left' }}>
                    { props.name } 
                    </Col>
                    <Col xs={1}>
                        { props.onPlus? <PlusCircle onClick={ props.onPlus } /> : (<></>)}
                    </Col>
                </Row>
            </Accordion.Toggle >
            <Accordion.Collapse eventKey="0">
               <ListGroup> 
                    { props.rooms.map(
                        room => ( 
                            <ListGroup.Item style={{ borderRadius: 0, cursor: 'pointer', background: (localStorage.room === room.uuid?'#efefff': 'none' )}} onClick={ handleChooseRoom(room) }>
                                <Row>
                                <Col xs={3} style={{ paddingRight: 0 }}>
                                    <Image 
                                        style={{ width: 50, height: 50}} 
                                        src={ room.photo?image_service.parse(room.photo):logo } 
                                        roundedCircle />
                                </Col>
                                <Col style={{ paddingLeft: 0, textAlign: 'left' }}>
                                    { room.alias }
                                </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    ) }
               </ListGroup>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default ChatBarSection