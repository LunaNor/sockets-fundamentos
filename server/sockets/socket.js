/*=================================================================================================================================*/
// Requires
/*=================================================================================================================================*/

const { io } = require('../server');

/*=================================================================================================================================*/
// Funciones de Socket, Logica
/*=================================================================================================================================*/

// Función para saber cuando un cliente se conecta
io.on('connection', (client) => {

    console.log('Usuario conectado');

    // Una vez conectado el client, envio un mensaje de bienvenida
    client.emit('enviarMensaje', {

        usuario: 'Admin',
        mensaje: 'Bienvenido a esta aplicación'

    });

    // En base al usuario que se conecto, esta funcion muestra cuando se desconecta
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);

        /* if (mensaje.usuario) {
            callback({
                resp: 'Todo salió bien!'
            });
        } else {
            callback({
                resp: 'No se envió el usuario!!!!'
            });
        } */


    });


});