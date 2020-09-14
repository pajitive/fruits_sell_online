const router = require('express').Router();
const controller = require('./products.controller');

router.post('/save',controller.save);
router.post('/getProducts',controller.get);
router.post('/changeStatus',controller.changeStatus);
router.delete('/deleteProduct?:id',controller.deleteProduct);
router.put('/updateProduct?:id',controller.updateProduct);

module.exports = router;
