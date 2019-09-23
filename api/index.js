require('dotenv').config();
const express = require('express');
const notesRouter = require('./src/routers/notes');
const usersRouter = require('./src/routers/users');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type,Authorization ,Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(usersRouter);
app.use(notesRouter);


app.listen(port, ()=> console.log('Server is up on port 3000'));
