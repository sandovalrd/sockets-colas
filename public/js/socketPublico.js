var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', (data) => {
    actualizarHtlml(data.atendidos);
});

socket.on('ultimosTikects', (data) => {
    const audioPlay = async() => {
            const audio = new Audio('audio/new-ticket.mp3');
            return await audio.play();
        }
        // audioPlay();
    actualizarHtlml(data.atendidos);
});

function actualizarHtlml(ultimos) {
    for (let i = 0; i < ultimos.length; i++) {
        lblTickets[i].text(`Ticket ${ultimos[i].numero}`);
        lblEscritorios[i].text(`Caja ${ultimos[i].caja}`);
    }
}