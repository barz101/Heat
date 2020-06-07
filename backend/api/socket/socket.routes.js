
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        // console.log('connected');
        
        socket.on('makeOrder', () => {
            io.emit('setOrders')
        }
        )
    })
}