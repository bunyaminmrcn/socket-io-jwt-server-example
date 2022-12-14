const socket_ = require('socket.io');
const jwt = require('jsonwebtoken');
const ee = require('./shared-ee');
const moment = require('moment');

let io;
let clients = [];


const __push = (array, item) => {
    array.push(item)
    ee.emit('push_fired', {})
}

const __splice = (array, start, count) => {
    array.splice(start, count)
    ee.emit('splice_fired', {})
}

const sio_init = async (server) => {
    
    io = socket_(server, { cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] } });
    io.use(function (socket, next) {

        
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return next(new Error('AuthError'));
                }
                socket.decoded = decoded;
                next()
            })
        } else {
            //console.log('NoKey')
            next(new Error('NoKey'));
        }
    }).on('connection', function (socket) {
        
        __push(clients, { uid: socket.decoded.id, socketId: socket.id });
        console.log(socket.id, socket.decoded.id)

        io.sockets.to(socket.id).emit('welcome', { socketId: socket.id });
        io.to(socket.decoded.id).emit('new_socketId', { socketId: socket.id});

        socket.on('sock_fetch', ({ uid }) => {

            socket.join(uid);
            const sources = clients.filter(x => x.uid == uid);
            const targets = clients.filter(x => x.uid == socket.decoded.id);

            targets.forEach((item) => {
                for (let i = 0; i < sources.length; i++) {
                    const source = sources[i];
                    io.to(item.socketId).emit('sock_fetch_result', { uid, socketId: source.socketId })
                }
            });
        })


        socket.on('post:/support/new_message', async (payload) => {
            try {
                //ee.emit('post:message:to', { to: socketId, payload: message.toJSON() })
                //ee.emit('post:message:to', { to: socket.id, payload: message.toJSON() })
            } catch (error) {
                //console.log('Error')
            }
        })

        socket.on('disconnect', async () => {
            const findIndex = clients.findIndex(x => x.socketId == socket.id);
            __splice(clients, findIndex, 1);
        });

    })

    

    ee.on('push_fired', () => {
        //console.log(clients.length + ' added')
    })
    ee.on('splice_fired', () => {
        //console.log(clients.length + ' removed')
    })


    ee.on('post:message:to', async (data) => {
        const { to, payload } = data;
        console.log({ to, payload })
        io.sockets.to(to).emit('post:message:to', payload)
    })
    ee.on('post:ticket', async (data) => {
        //const umac = await UserMachine.findOne({ where: { id: data.userMacId } })
        io.sockets.emit('post:ticket', { ...data })
    })
    ee.on('post:message', async (data) => {
        io.sockets.emit('post:message', { ...data })
    })

}

module.exports = { sio_init }