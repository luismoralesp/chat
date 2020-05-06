import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Room from './Room'
import ChatBar from './ChatBar'
import RoomsBar from './RoomsBar'
import SearchRoom from './SearchRoom'
import Header from './Header'
import AuthService from "../services/auth_service";
import SocketService from "../services/socket_service";

const auth_service = new AuthService()
const socket_service = SocketService.getInstance()

function Main() {
  const [ room, setRoom ] = useState("")
  const [ choose, setChoose ] = useState("")
  const [ search, setSearch ] = useState("")
  const [ focus, setFocus ] = useState(null)

  const token = localStorage.token
  const user = localStorage.user

  if (!token || !user){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.replace("/login")
  }

  const me = JSON.parse(user)

  socket_service.connect(me.uuid)
  
  useEffect(() => {

    check_session()

    function check_session(){
      
      auth_service.refresh()
        .then(resp => {
            localStorage.setItem('token', (resp.data.token))
            localStorage.setItem('user', JSON.stringify(resp.data.user))
            auth_service.updateNextTime()
        })
    }

    setInterval(check_session, auth_service.getNextMillis() )

  }, [])

  function handleChooseRoom(room, choose){
    setRoom(room)
    setChoose(choose)
    setFocus(null)
  }

  function handleSearch(search){
    setSearch(search)
  }

  function handleMessageChoose(message){
    setRoom(message.room)
    setFocus(message.uuid)
  }

  return (
    <Container fluid >
      <Row>
        <Header onMessageChoose={ handleMessageChoose }/>
      </Row>
      <Row>
        <Col xs={3} style={{ paddingRight: 0 }}>
          <SearchRoom onSearch={ handleSearch } />
          <RoomsBar onChooseRoom={ handleChooseRoom } search={ search } room={choose}></RoomsBar>
        </Col>
        <Col style={{ paddingLeft: 0 }}>
          <Room room={ room } focus={ focus }></Room>
          <ChatBar room={ room }></ChatBar>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
