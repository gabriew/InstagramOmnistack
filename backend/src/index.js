const express = require('express');//lidar com rotas, parâmetros e respostas
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);//permite enviar informações em tempo real através de web sockets

//conexão mongo DB
mongoose.connect('mongodb+srv://gomer:gomer@cluster0-88y5v.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});
app.use((req,res, next) => {
    req.io = io;
    next();
})
app.use(cors());//permite que todas as urls de diferentes servidores possa acessas esse back-end
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

server.listen(33);