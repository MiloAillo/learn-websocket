const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    answer = ['hiaa!!', 'Heyooo!', 'Haiiii!!!!']
    console.log(`${socket.id} is sucesfully connected!`)

    socket.on('message', message => {
        const random =  Math.floor(Math.random() * 3)
        console.log(message)
        socket.emit('message', answer[random])
    })

    socket.on('broadcast', message => {
        console.log(message)
        socket.broadcast.emit('broadcast', message)
    })
})