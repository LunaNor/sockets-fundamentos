/*=================================================================================================================================*/
// Requires
/*=================================================================================================================================*/
const fs = require('fs');

/*=================================================================================================================================*/
// Clase Ticket
/*=================================================================================================================================*/

class Ticket {

    //necesitamos el número y el escritorio que va a atender ese ticket
    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

/*=================================================================================================================================*/
// Clase TicketControl 
/*=================================================================================================================================*/

class TicketControl {

    constructor() {

        /* Variables */
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        /* Lectura de archivo json */
        let data = require('../data/data.json');

        /* Condiciones para crear el objeto */
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();

        }


    }

    /*=================================================================================================================================*/
    // Funciones de la clase
    /*=================================================================================================================================*/

    /* Suma y genera un ticket más, lo añade al arreglo de tickets y graba en el archivo json */
    siguienteTicket() {

        this.ultimo += 1;

        //crear el nuevo ticket
        let ticket = new Ticket(this.ultimo, null);
        //agregar nuevo ticket al arreglo de tickets
        this.tickets.push(ticket);

        /* Grabar en el archivo de texto */
        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    /* Retorna el último ticket */
    getUltimoTicket() {

        return `Ticket ${ this.ultimo }`;

    }

    /* Retornalos ultimos 4 tickets en cola */
    getUltimos4() {

        return this.ultimos4;

    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        // rompemos la relación que tiene javascript con que todos los objetos son pasados por referencia
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); // se elimina el primer elemento

        // Creamos un nuevo ticket para atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // agregamos el nuevo ticket atendido al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {

            this.ultimos4.splice(-1, 1); //borra el ultimo elemento

        }

        console.log('Últimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    /* Reinicia el ultimo ticket y los tickets en espera */
    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }


    /* Graba en el archivo json */
    grabarArchivo() {

        let jsonData = {

            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4

        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }


}


/*=================================================================================================================================*/
// Exportación
/*=================================================================================================================================*/
module.exports = {
    TicketControl
}