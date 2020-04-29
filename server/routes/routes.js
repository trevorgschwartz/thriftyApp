const router = require('express').Router();
const controller = require('../controllers/controller.js');


router.post('/save', controller.saveTransaction);
router.get('/getCategories', controller.getCategories);
router.post('/getByCategory', controller.getTransactionByCategory)

module.exports = router;