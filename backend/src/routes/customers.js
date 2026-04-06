const express = require('express')
const router = express.Router()
const { listCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController')
const { requireFields } = require('../middlewares/validate')

router.get('/', listCustomers)
router.post('/', requireFields(['name','email']), createCustomer)
router.put('/:id', requireFields(['name','email']), updateCustomer)
router.delete('/:id', deleteCustomer)

module.exports = router
