var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

$('button').on('click', () => {
    socket.emit('nextTicket', null, function(siguiente) {
        label.text(siguiente);
    })
});

socket.on('estadoActual', (msj) => {
    label.text(msj.ultimo);
})

// socket.emit('evento',mensaje,callback())