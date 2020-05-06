import React from 'react';
import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

const style = {
    background: '#efefff',
}

function Message(props) {

    return (
        <ListGroup.Item ref={ props.mRef } style={props.focus?style:{}}>
            <Card.Body>
                <Card.Title>{ props.alias }</Card.Title>
                <Card.Text>{ props.message }</Card.Text>
            </Card.Body>
        </ListGroup.Item>
    )
}

export default Message