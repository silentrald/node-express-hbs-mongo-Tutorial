const router  = require('express')();
const mw      = require('../mw/index');
const ctrl    = require('../ctrl/index');

const authMw  = require('../mw/auth');

router.get('/',
    mw.sample,
    ctrl.getIndex
);

router.get('/sample',
    ctrl.getSample
);

router.get('/login',
    authMw.isNotAuth,
    ctrl.getLogin,
);

router.get('/register',
    authMw.isNotAuth,
    ctrl.getRegister
);

router.post('/login',
    authMw.isNotAuth,
    ctrl.postLogin
);

router.post('/register',
    authMw.isNotAuth,
    ctrl.postRegister
);

module.exports = router;
