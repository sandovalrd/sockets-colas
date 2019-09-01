var socket = io();
var label = $('small');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

var searhParams = new URLSearchParams(window.location.search)

if (!searhParams.has("caja")) {
    window.location = 'index.html';
    console.error('La caja es necesaria!');
}

var caja = searhParams.get("caja");
$('h1').text(`Caja ${caja}`);


$('button').on('click', () => {
    socket.emit('atenderTicket', { caja }, function(res) {
        if (res === 'No hay tickets') {
            alert(res);
            return
        }
        label.text(res.numero);
    })
});