import React, { useState, useEffect  } from 'react';
import RoomsBarSection from './RoomsBarSection';
import UserService from '../services/user_service';
import RoomService from '../services/room_service';
import SocketService from "../services/socket_service";
import NewGroup from './NewGroup'

const style = {
    overflow: 'auto',
    height: 'calc(100vh - 152px)'
}

const user_service = new UserService()
const room_service = new RoomService()
const socket_service = SocketService.getInstance()

function RoomBar(props) {
    const [ groups, setGroups ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ show, setShow ] = useState(false)
    const me = JSON.parse(localStorage.user)

    useEffect(() => {
        user_service.list({ search: props.search })
        .then(users => setUsers(users.data))

        room_service.list({ personal:false, members: me.uuid })
        .then(rooms => setGroups(rooms.data))

        room_service.list({ members: me.uuid })
        .then(rooms => socket_service.subscribe(rooms.data.map(room => room.uuid)))

        localStorage.search_user = props.search
        socket_service.onNewUser(() => {
            user_service.list({  })
            .then(users => setUsers(users.data))
        })
        
        socket_service.onNewRoom(() => {
            const me = JSON.parse(localStorage.user)

            room_service.list({ personal:false, members: me.uuid })
            .then(rooms => setGroups(rooms.data))
        })

    }, [props.search])


    function handleChooseRoom(room){
        props.onChooseRoom(room.uuid, room.uuid)
    }

    function handleChooseUser(user){
        room_service.create({
            alias: user.alias,
            members: user.uuid != me.uuid?[
                user.uuid,
                me.uuid
            ]: [me.uuid],
            personal: true
        }).then(room => props.onChooseRoom(room.data.uuid, user.uuid))
    }

    function handlePlus(e){
        setShow(true)
        e.preventDefault()
        e.stopPropagation()
    }

    function handleHide(){
        setShow(false)
    }
    
    return (
        <div style={style}>
            <NewGroup show={show} onHide={ handleHide } />
            <RoomsBarSection
                name="Personal rooms"
                rooms={ users }
                room={props.room}
                onChooseRoom={ handleChooseUser }
            ></RoomsBarSection>
           
            <RoomsBarSection
                name="Group rooms"
                rooms={ groups }
                room={props.room}
                onChooseRoom={ handleChooseRoom }
                onPlus={ handlePlus }
            ></RoomsBarSection>
        </div>
    )
}

export default RoomBar