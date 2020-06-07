const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getOrder, deleteOrder, updateOrder, getOrderBySeller, getOrderByBuyer, addOrder, getOrders } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/city/:id', getOrdersByCity)
router.get('/', getOrders)
router.get('/:id', getOrder)
router.get('/seller/:id', getOrderBySeller)
router.get('/buyer/:id', getOrderByBuyer)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)
router.post('/', addOrder)

module.exports = router