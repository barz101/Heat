const cityService = require('./city.service')
const logger = require('../../services/logger.service')
  
async function getCities(req, res) {
    // console.log(req.query);
    const cities = await cityService.query(req.query)
    // logger.debug(cities);
    res.send(cities)
}

async function getCity(req, res) {
    const city = await cityService.getById(req.params.id)
    // console.log(city);
    res.send(city)
}

module.exports = {
    getCities,
    getCity
}