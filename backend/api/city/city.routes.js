const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getCities, getCity} = require('./city.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/:id', getCity)
router.get('/', getCities)

module.exports = router