const dbService = require('../../services/db.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('city')
    try {
        const cities = await collection.find(criteria).toArray();
        return cities
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(cityId) {
    const collection = await dbService.getCollection('city')
    try {
        const city = await collection.findOne({ "_id": ObjectId(cityId) })
        return city
    } catch (err) {
        console.log(`ERROR: while finding city ${cityId}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.username = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    }
    return criteria;
}