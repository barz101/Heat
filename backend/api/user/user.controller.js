const userService = require('./user.service')
const logger = require('../../services/logger.service')
const url = require('url');
const querystring = require('querystring');

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}
  
async function getUsers(req, res) {
    // console.log(req.query);
    const users = await userService.query(req.query)
    // logger.debug(users);
    res.send(users)
}

// async function getUsersByCity(req, res) {
//     const users = await userService.queryByCity(req.params.id)
//     // logger.debug(users);
//     res.send(users)
// }

async function getFavUsers(req, res){
    const users = await userService.queryFav(Object.values(req.query))
    res.send(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    await userService.update(user)
    res.send(user)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    // getUsersByCity,
    getFavUsers
}