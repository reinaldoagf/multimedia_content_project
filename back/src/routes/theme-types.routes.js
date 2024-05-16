const express = require('express');
const { _all } = require('../controllers/theme-types.controller');

const router = express.Router();

/* GET themes listing. */

router.get('/', _all);

module.exports = router;