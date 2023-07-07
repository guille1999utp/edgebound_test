const { Router } = require('express');
const { searchProduct } = require('../controllers');
const router = Router();

router.get('/search',searchProduct);

module.exports = router;