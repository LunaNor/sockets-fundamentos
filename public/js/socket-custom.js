var socket = io();

// Cuando se conecta al servidor
socket.on('connect', function() {

    console.log('Conectado al servidor');

});

// Cuando pierde conexión con el servidor
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Enviar información al servidor
socket.emit('enviarMensaje', {
    usuario: 'Nicolas',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('Respuesta Server: ', resp);
});

// Escuchar Información del servidor
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});