const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);


//// Express App Config
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(cookieParser());

app.use(session({
    secret: 'SECRETE3943738937462',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const cityRoutes = require('./api/city/city.routes')
const orderRoutes = require('./api/order/order.routes')
const connectSockets = require('./api/socket/socket.routes')


app.use('/api/auth', authRoutes)
app.use('/api/city', cityRoutes)
app.use('/api/user', userRoutes)
app.use('/api/order', orderRoutes)
connectSockets(io)

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});