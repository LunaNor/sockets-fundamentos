/*=================================================================================================================================*/
// Requires
/*=================================================================================================================================*/

const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

// Creamos un nuevo objeto para manipular los tickets
const ticketControl = new TicketControl();


/*=================================================================================================================================*/
// Funciones de Socket, Logica
/*=================================================================================================================================*/

// Función para saber cuando un cliente se conecta
io.on('connection', (client) => {

    /* Escucha el evento que para hacer el siguiente ticket */
    client.on('siguienteTicket', (data, callback) => {

        callback(ticketControl.siguienteTicket());

    });

    /* Emite el actual ticket */
    client.emit('estadoActual', {

        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()

    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {

            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        /* Creo un nuevo ticket atendido */
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar - notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });

});