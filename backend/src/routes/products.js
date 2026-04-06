const express = require('express')
const router = express.Router()
const { listProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { requireFields } = require('../middlewares/validate')

router.get('/', listProducts)
router.post('/', requireFields(['name','price']), createProduct)
router.put('/:id', requireFields(['name','price']), updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
