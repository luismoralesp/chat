import React, { useState } from 'react';
import { Chat } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import MessageService from '../services/message_service';
import SocketService from "../services/socket_service";
import Picker from 'emoji-picker-react';

const style = {
}

const message_service = new MessageService()
const socket_service = SocketService.getInstance()

function ChatBar(props) {
    const [ message, setMessage ] = useState("")
    const [ show, setShow ] = useState(false)
    const me = JSON.parse(localStorage.user)
    let new_message = message

    function handleEmojiClick(e, emojiObject){
        new_message += emojiObject.emoji
        setMessage(new_message)
    }

    function handleClick(){
        setShow(!show)
    }

    function handleChange(e){
        setMessage(e.target.value)
    }

    function hadleSendMessage(){
        setMessage("")
        message_service.create({
            emitter: me.uuid,
            room: props.room,
            message
        }).then(message => {
            
        })
    }

    function handleKeyPress(e){
        if (e.key === "Enter"){
            hadleSendMessage()
        }
    }
    return (
        <Card>
            
           <Row>
               <Col xs={1} style={show?{ marginTop: '-320px', paddingRight: 0 }:{ paddingRight: 0 }} >
                    { show? 
                        <Picker 
                            onEmojiClick={handleEmojiClick}
                            />: (<></>)}
                    <Button 
                        style={{ width:'100%', height: '70px' }} variant="" type="submit"
                        onClick={ handleClick }
                        >
                        😉
                    </Button>
               </Col>
               <Col style={{ paddingLeft: 0, paddingRight: 0 }} >
                    <Form.Control 
                        style={{ paddingLeft: 20, height: '70px' }} 
                        type="text" 
                        placeholder="Send a message..." 
                        value={ message }
                        onKeyPress={ handleKeyPress } 
                        onChange={ handleChange }/>
               </Col>
               <Col xs={1} style={{ paddingLeft: 0 }}>
                    <Button style={{ width:'100%', height: '70px' }} variant="primary" type="submit">
                        <Chat />
                    </Button>
               </Col>
           </Row>
        </Card>
    )
}

export default ChatBar