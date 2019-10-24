/*=================================================================================================================================*/
// Requires
/*=================================================================================================================================*/
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

/*=================================================================================================================================*/
// Inicializaciones
/*=================================================================================================================================*/

// Iniciamos express y montamos el servidor http con las configuraciones de express
const app = express();
let server = http.createServer(app);

// Configuraciones para el cliente estatico
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicación del backend
module.exports.io = socketIO(server);

// Ocupamos el archivo que contiene la funciones sockets, es como decir "se requiere el archivo socket"
require('./sockets/socket');

/*=================================================================================================================================*/
// Configuración server (escuchar peticiones)
/*=================================================================================================================================*/
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});