
const TicketModel = require("../models/ticketModel");


const createTicket = (req, res) => {
    const ticket = req.swagger.params.data.value;

    TicketModel.create(ticket).then(newTicket => {
        console.log("Created new ticket successfully", newTicket._id);
        res.send(newTicket)
    }).catch(err => {
        console.error("Error in creating new ticket", err);
        res.status(400).send(err);
    })
}

const findTicketById = (req, res) => {
    const ticketId = req.swagger.params.id.value;

    TicketModel.findOne({
        _id: ticketId
    }).then(ticket => {
        if (ticket) {
            res.send(ticket);
        } else {
            console.error("No tickets found", ticketId);
            reject({
                message: "Provide valid ticket id"
            })
        }
    }).catch(err => {
        console.error("Error in fetching ticket", ticketId);
        res.status(400).send(err);
    })
}

const findTickets = (req, res) => {
    const page = req.swagger.params.page.value;
    const count = req.swagger.params.count.value;
    const select = req.swagger.params.select.value;
    const sort = req.swagger.params.sort.value;

    TicketModel.find(filter, select, page, count, sort).then(tickets => {
        res.send(tickets)
    }).catch(err => {
        consotle.error("Error in fetching Admins", err);
        res.status(400).send(err);
    })
}

const cancelTickets = (req, res) => {
    const ticketId = req.swagger.params.id.value;

    TicketModel.update({
        _id: ticketId
    }, {
        status: "Cancelled"
    }).then(result => {
        console.log("Cancelled ticket successfully");
        res.send()
    }).catch(err => {
        console.error("Error in cancelling ticket", err);
        res.status(400).send(err);
    })
}

const confirmTicket = (req, res) => {
    const ticketId = req.swagger.params.id.value;

    TicketModel.update({
        _id: ticketId
    }, {
        status: "Confirmed"
    }).then(result => {
        console.log("Confirmed ticket successfully");
        res.send()
    }).catch(err => {
        console.error("Error in confirming ticket", err);
        res.status(400).send(err);
    })
}

module.exports = {
    createTicket,
    findTickets,
    findTicketById,
    cancelTickets,
    confirmTicket
}