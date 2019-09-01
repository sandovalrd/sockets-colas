const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('atenderTicket', (data, callback) => {
        if (!data.caja) {
            return "La caja es necesario!"
        }
        const atenderTicket = ticketControl.atenderTicket(data.caja);
        callback(atenderTicket);
        client.broadcast.emit('ultimosTikects', {
            atendidos: ticketControl.getLastAtendidos()
        })
    })

    client.emit('estadoActual', {
        ultimo: ticketControl.getLastTicket(),
        atendidos: ticketControl.getLastAtendidos()
    });


    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // Escuchar el cliente
    client.on('nextTicket', (msj, callback) => {
        const siguiente = ticketControl.nextTicket();
        console.log(siguiente);
        callback(siguiente);
    });

});