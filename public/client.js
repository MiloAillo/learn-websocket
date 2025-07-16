import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
const socket = io('http://localhost:3000')

const text = document.getElementById('text')
const display = document.getElementById('display')
const broadcast = document.getElementById('broadcast')
const room = document.getElementById('room')

// connection established
socket.on('connect', () => {
    console.log(`this is your user id: ${socket.id}`)
    document.getElementById('id').innerHTML = socket.id
    display.innerHTML += `<p>Youre connected with id: ${socket.id}<p>`
})

// 'broadcast' event listener
socket.on('broadcast', message => {
    display.innerHTML += `<p>[Broadcast] ${message}</p>`
})

// 'message' event listener 
socket.on('message', (message, socket) => {
    if (!socket) {
    display.innerHTML += `<p>Server: ${message}</p>`
    } else {
        display.innerHTML += `<p>${socket}: ${message}</p>`
    }
})

// sending text message to serverr
window.message = () => {
    if (!text.value) return
    else {
        display.innerHTML += `<p>[${room.value ? 'to Private' : 'to Server'}] You: ${text.value}</p>`
        socket.emit('message', text.value, room.value)
    }
}

window.broadcast = () => {
    console.log(broadcast.value)
    if (!broadcast.value) return
    else {
        socket.emit('broadcast', broadcast.value)
        display.innerHTML += `<p>Broadcasted!</p>`
    }
}

window.join = () => {
    console.log(room.value)
    socket.emit('join-room', room.value)
}
