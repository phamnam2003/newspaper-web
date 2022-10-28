const express = require('express');
const router = express.Router();

const addController = require('../app/controllers/AddController');

router.get('/', addController.form);
router.post('/postnews', addController.add);

module.exports = router;