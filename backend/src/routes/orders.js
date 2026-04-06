const express = require('express')
const router = express.Router()
const { listOrders, createOrder, getOrder, updateOrderStatus } = require('../controllers/orderController')
const { requireFields } = require('../middlewares/validate')

router.get('/', listOrders)
router.post('/', requireFields(['total']), createOrder)
router.get('/:id', getOrder)
router.put('/:id/status', requireFields(['status']), updateOrderStatus)

module.exports = router
