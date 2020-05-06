import React, { useState, useRef } from 'react';
import SearchMessage from './SearchMessage'
import { Image } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Power } from 'react-bootstrap-icons';
import ImageService from '../services/image_service'
import UserService from '../services/user_service'
import logo from '../logo.svg'

const image_service = new ImageService()
const user_service = new UserService()

function Header(props){
    const [ show, setShow ] = useState(false)
    const [ me, setMe ] = useState(JSON.parse(localStorage.user))
    
    const refFile = useRef()

    function handleClick(){
        setShow(true)
    }

    function handleClose(){
        setShow(false)
    }

    function handleMessageChoose(message){
        setShow(false)
        props.onMessageChoose(message)
    }

    function handleChooseFile(e){
        image_service.upload(e.target.files[0])
        .then( image => user_service.patch(me.uuid, { photo: image.data.uuid }))
        .then( user => {
            const me = JSON.stringify(user.data)
            localStorage.setItem("user", me)
            setMe(user.data)
        })
    }

    function handleClickPhoto(e){
        refFile.current.click()
    }

    function handlePower(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.replace("/login")
    }
    

    return (
        <Container fluid>
            <input 
                ref={refFile}
                type={"file"}
                style={{display:'none'}}
                onChange={ handleChooseFile }
            />
            <SearchMessage show={ show } onHide={ handleClose } onMessageChoose={ handleMessageChoose } />
            <Row>
                <Col xs={3} style={{ paddingRight: 0 }}>
                    <Card style={{ width: '100%' }} >
                        <Row>
                            <Col xs={2}>
                                <Image 
                                    style={{ width: 40, height: 40, margin: 5, cursor: 'pointer' }} 
                                    src={ me.photo?image_service.parse(me.photo):logo } 
                                    onClick={ handleClickPhoto }
                                    roundedCircle />
                            </Col>
                            <Col style={{ padding: 12 }}>
                                { me.alias }
                            </Col>
                            <Col xs={3}>
                                <Power 
                                    style={{ width: 18, height: 18, margin: 15, cursor: 'pointer' }}
                                    onClick={ handlePower }
                                    />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col style={{ paddingLeft: 0 }}>
                <Card style={{ width: '100%' }}>
                    <Row>
                        <Col>
                            <Image style={{ width: 50, height: 50 }} src={ logo } roundedCircle />
                        </Col>
                        <Col xs={1}>
                            <Search 
                                style={{ width: 18, height: 18, margin: 15, cursor: 'pointer' }}
                                onClick={ handleClick }
                                />
                        </Col>
                        
                    </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Header