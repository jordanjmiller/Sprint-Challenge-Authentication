const express = require('express');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');
const KnexSessionStore = connectSessionKnex(session);
const db = require('../database/dbConfig.js')
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();


// configure express-session middleware
server.use(
    session({
      name: 'notsession', // default is connect.sid
      secret: 'nobody tosses a dwarf!',
      cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false, // only set cookies over https. Server will not send back a cookie over http.
      }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      resave: false,
      saveUninitialized: false,
      store: new KnexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,
      })
    })
  );

  

  const corsConfig = {
    origin: 'http://localhost:3002',
    credentials: true,
}
server.use(helmet());
server.use(cors(corsConfig));
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users',authenticate, userRouter)
server.use('/api/jokes', authenticate, jokesRouter);


server.get('/', (req, res) => {
    res.status(200).json({message: 'hi'});
});

module.exports = server;
