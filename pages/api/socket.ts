import { Server } from 'Socket.IO'

const SocketHandler = (req:any, res:any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
        socket.on('send_message', (msg, room) => {
            if (room === ''){
                socket.broadcast.emit('receive_message', msg)
            } else {
                socket.to(room).emit('receive_message', msg)
            }
        })
        socket.on('join_room', room => {
            socket.join(room)
        })
      })
  }
  res.end()
}

export default SocketHandler