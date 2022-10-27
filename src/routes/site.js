const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/:category', siteController.category);
router.get('/add', siteController.add);
router.get('/', siteController.home);

module.exports = router;