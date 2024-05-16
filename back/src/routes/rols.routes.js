const express = require('express');
const { _all } = require('../controllers/rols.controller');
const router = express.Router();

/* GET rols listing. */
router.get('/', _all);

module.exports = router;