

const StationModel = require("../models/stationModel");


const createStation = (req, res) => {
    const station = req.swagger.params.data.value;
    StationModel.create(station).then(newStation => {
        console.log("Successfully created station", newStation._id);
        res.status(204).send();
    }).catch(err => {
        console.error("Error in creating new station", err);
        res.station(400).send(err);
    })
}

const getStationById = (req, res) => {
    const stationId = req.swagger.params.id.value;

    StationModel.findOne({
        _id: stationId
    }, {
        name: 1,
        createdAt: 1
    }).then(station => {
        if (station) {
            console.error("Error in creating new station", err);
            res.station(400).send(err);
        } else {
            console.error("Station with id", stationId, "not found");
            res.status(400).send({
                message: "Station document not found"
            })
        }
    }).catch(err => {
        console.error("Error in fetching station", err);
        res.station(400).send(err);
    })
}

const fetchStationList = (req, res) => {
    const page = req.swagger.params.page.value;
    const count = req.swagger.params.count.value;
    const select = req.swagger.params.select.value;
    const sort = req.swagger.params.sort.value;

    UserModel.find(filter, select, page, count, sort).then(users => {
        res.send(users)
    }).catch(err => {
        consotle.error("Error in fetching Admins", err);
        res.status(400).send(err);
    })
}

const updateStation = (req, res) => {
    const stationId = req.swagger.params.id.value;
    const data = req.swagger.params.data.value;

    StationModel.update({
        _id: stationId
    }, data).then(result => {
        console.log("Successfully updated station data");
        res.status(204).send();
    }).catch(err => {
        console.error("Error in updating station data", err);
        res.status(400).send(err);
    })
}

const deleteStation = (req, res) => {
    const stationId = req.swagger.params.id.value;

    StationModel.update({
        _id: stationId
    }, {
        isDeleted: true
    }).then(result => {
        console.log("Successfully deleted station", stationId);
        res.status(204).send();
    }).catch(err => {
        console.error("Error in deleting station", stationId, err);
        res.status(400).send(err);
    })
}


module.exports = {
    createStation,
    getStationById,
    fetchStationList,
    updateStation,
    deleteStation
}