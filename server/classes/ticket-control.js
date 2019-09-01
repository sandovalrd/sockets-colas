const fs = require('fs');

class Ticket {
    constructor(numero, caja) {
        this.numero = numero;
        this.caja = caja;
    }
}


class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.atendidos = [];

        const data = require('../data/db.json');
        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.atendidos = data.atendidos;
            this.tickets = data.tickets;
        } else {
            this.reiniciarTickets();
        }

    }

    nextTicket() {
        this.ultimo += 1;
        let tickets = new Ticket(this.ultimo, null);
        this.tickets.push(tickets);
        this.saveTickets();

        return `Ticket ${this.ultimo}`
    }

    reiniciarTickets() {
        this.ultimo = 0;
        this.tickets = [];
        this.atendidos = [];
        this.saveTickets();
        console.log('Se a reiniciado el sistema!');
    }

    getLastTicket() {
        return `Ticket ${this.ultimo}`
    }

    getLastAtendidos() {
        return this.atendidos
    }

    atenderTicket(caja) {
        if (this.tickets.length === 0) {
            return "No hay tickets"
        }
        const numero = this.tickets[0].numero;
        this.tickets.shift();
        const atenderTicket = new Ticket(numero, caja)

        this.atendidos.unshift(atenderTicket);
        if (this.atendidos.length > 4) {
            this.atendidos.splice(-1, 1);
        }
        this.saveTickets();
        console.log('Ultimos 4');
        console.log(this.atendidos);

        return atenderTicket;
    }

    saveTickets() {
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            atendidos: this.atendidos
        }
        const data = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/db.json', data);
    }
}

module.exports = {
    TicketControl,
}