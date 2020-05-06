import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import Message from './Message'
import MessageService from '../services/message_service'
import SocketService from "../services/socket_service"

const style = {
    height: 'calc(100vh - 160px)',
    overflow: 'auto',
}

const socket_service = SocketService.getInstance()
const message_service = new MessageService()
const scrollToRef = (parent, elm) => parent.scrollTo(0, elm.offsetTop)

function Room(props) {
    const [ messages, setMessages ] = useState([]);
    const parent = useRef(null)

    function messagesRef(message){
        return (elm) => {
            if (elm && parent.current && message.uuid === props.focus){
                scrollToRef(parent.current, elm)
            } else {
                if (!props.focus && message.uuid === messages[messages.length - 1].uuid){
                    parent.current.scrollTo(0, parent.current.scrollHeight)
                }
            }
        }
    }

    useEffect(() => {
        message_service.list({ room: props.room })
        .then(messages => {
            setMessages(messages.data)

            socket_service.onMessage(props.room, ({ message }) => {
                message_service.list({ room: message.room })
                .then(messages => {
                    setMessages(messages.data)
                })                        
            })
        })
        
    }, [ props.room, props.focus ])

    return (
        <Card style={ style } ref={ parent }>
            { messages.map( message => (
                <Message
                    mRef={ messagesRef(message) }
                    key={message.uuid}
                    date={message.date}
                    emitter={message.emitter}
                    alias={message.alias}
                    room={message.room}
                    message={message.message}
                    focus={message.uuid === props.focus}
                ></Message>
            )) }
        </Card>
    )
}

export default Room