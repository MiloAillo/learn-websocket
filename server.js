const io = require("socket.io")(3000)

io.on('connection', socket => {
    console.log(`${socket.id} is sucesfully connected!`)
    io.emit('notification', `${socket.id} is sucesfully connected!`)
    socket.emit('greet', `welcome!`)
})