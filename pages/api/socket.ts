import { Server } from 'Socket.IO'

const SocketHandler = (req:any, res:any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
        socket.on('input_change', msg => {
          socket.broadcast.emit('update_input', msg)
        })
      })
  }
  res.end()
}

export default SocketHandler