const router  = require('express')();
const mw      = require('../mw/index');
const ctrl    = require('../ctrl/index');

router.get('/',
    mw.sample,
    ctrl.getIndex
);

router.get('/sample',
    ctrl.getSample
);

module.exports = router;
