const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/:category/:slug', siteController.details);
router.get('/:category', siteController.category);
router.get('/', siteController.home);

module.exports = router;