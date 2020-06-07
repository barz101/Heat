const orderService = require('./order.service')
const logger = require('../../services/logger.service')

async function getOrder(req, res) {
    const order = await orderService.getById(req.params.id)
    res.send(order)
}

async function getOrders(req, res) {
    const orders = await orderService.query(req.params.id)
    res.send(orders)
}
  
async function getOrderBySeller(req, res) {    
    const orders = await orderService.queryBySeller(req.params.id)
    console.log(orders)
    res.send(orders)
}
async function getOrderByBuyer(req, res) {
    const order = await orderService.queryByBuyer(req.params.id)
    res.send(order)
}

async function deleteOrder(req, res) {
    await orderService.remove(req.params.id)
    res.end()
}

async function updateOrder(req, res) {
    const order = req.body;
    await orderService.update(order)
    res.send(order)
}

async function addOrder(req, res) {
    var order = req.body;
    // order.byUserId = req.session.user._id;
    order = await orderService.add(order)
    // order.byUser = req.session.user;
    res.send(order)
}

module.exports = {
    getOrder,
    getOrderBySeller,
    getOrderByBuyer,
    deleteOrder,
    updateOrder,
    addOrder,
    getOrders
}