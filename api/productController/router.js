const router = require('express').Router();
const productController = require('./controller');

router.post('/add', productController.createProduct);
router.put('/update', productController.updateProducts);
router.get('/list/:limit/:offset', productController.getAllProducts);
router.delete('/delete', productController.deleteProducts);
router.get('/:id', productController.getProducts);

module.exports = router;
