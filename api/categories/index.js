const router = require('express').Router();
const controller = require('./categories.controller');

router.post('/save',controller.save);
router.post('/getCategories',controller.get);
router.post('/changeStatus',controller.changeStatus);
router.delete('/deleteCategory?:id',controller.deleteCategory);
router.put('/updateCategory?:id',controller.updateCategory);

module.exports = router;
