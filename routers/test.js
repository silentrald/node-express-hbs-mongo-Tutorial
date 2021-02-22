const router = require('express')();
const ctrl = require('../ctrl/test');

router.get('/', ctrl.getIndex);

module.exports = router;