const io = require('socket.io')(8888)
let users = []
const shared_room = '{SHARED-ROOM}'

console.log('Listen on port:', 8888)

io.on('connection', (socket) => {
    const uuid = socket.handshake.query.uuid
    socket.join(uuid)
    socket.join(shared_room)
    users.push(uuid)

    console.log('connection', uuid)
    
    socket.on('subscribe', ({rooms}) => {
        console.log('subscribe', rooms)
        rooms.forEach(room => socket.join(room))
    })

    socket.on('message', ({message}) => {
        console.log('message', message)
        io.to(message.room).emit('message', {message})
    })

    socket.on('new-user', ({user}) => {
        console.log('new-user', user)
        io.to(shared_room).emit('new-user', {user})
    })

    socket.on('new-room', ({room}) => {
        console.log('new-room', room)
        users.filter(user => 
            room.members.includes(user))
        .forEach(
            user =>
                io.to(user).emit('new-room', {room})
        )
    })

    socket.on('disconnect', () => {
        console.log('disconnect', uuid)
        users = users.filter(u => u && u.uuid !== uuid)
    })
})
