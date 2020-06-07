const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(email, password) {
    // logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const hash = await bcrypt.hash(password, saltRounds)
    user.password = hash;
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(email, password, first, last, imgUrl) {
    logger.debug(`auth.service - signup with email: ${email}, first: ${first}, last: ${last}. imgUrl: ${imgUrl}`)
    if (!email || !password || !first|| !last) return Promise.reject('email, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    const name = {
        first,
        last
    }
    return userService.add({email, password: hash, name, imgUrl})
}

module.exports = {
    signup,
    login,
}