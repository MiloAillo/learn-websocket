const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    answer = ['hiaa!!', 'Heyooo!', 'Haiiii!!!!']
    console.log(`${socket.id} is sucesfully connected!`)

    socket.on('message', (message, room) => {
        const random =  Math.floor(Math.random() * 3)
        if (!room) {
        console.log('to Server')
        socket.emit('message', answer[random])
        } else {
            console.log('to Private')
            socket.to(room).emit('message', message, socket.id)
        }
    })

    socket.on('broadcast', message => {
        console.log(message)
        socket.broadcast.emit('broadcast', message)
    })

    socket.on('join-room', room => {
        console.log(room)
        socket.join(room)
    })
})