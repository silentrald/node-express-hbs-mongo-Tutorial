const router    = require('express')();
const ctrl      = require('../ctrl/user');
const authMw    = require('../mw/auth');

router.get('/',
    authMw.isAuth,
    ctrl.getUser
);

module.exports = router;