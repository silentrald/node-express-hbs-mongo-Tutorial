const { client } = require('../db');
const bcrypt     = require('bcrypt');

const indexCtrl = {
    getIndex: (_req, res) => {
        return res.render('index', {
            title: 'Index Page',
            msg: 'Hi there guys',
            header: 'header',
            tab: 'index'
        });
    },

    getSample: (_req, res) => {
        return res.send('This is the sample route');
    },

    getLogin: (_req, res) => {
        return res.render('login', {
            title: 'Login Page',
            tab: 'login'
        });
    },

    getRegister: (_req, res) => {
        return res.render('register', {
            title: 'Register',
            tab: 'register'
        });
    },

    postLogin: async (req, res) => {
        const { username, password } = req.body;

        try {
            const db = await client();

            const user = await db.collection('users').findOne({ username });

            if (!user) {
                return res.status(403).render('login', {
                    title: 'Login Page',
                    tab: 'login',
                    error: 'Auth Failed'
                });
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return res.status(403).render('login', {
                    title: 'Login Page',
                    tab: 'login',
                    error: 'Auth Failed'
                });
            }

            delete user.password;

            req.session.user = user;

            return res.redirect('/user');

        } catch (err) {
            console.log(err);

            return res.status(500).render('login', {
                title: 'Login Page',
                tab: 'login',
                error: 'Something went wrong on our side'
            });
        }
    },

    postRegister: async (req, res) => {
        const { username, password } = req.body;

        try {
            const db = await client();

            const salt = await bcrypt.genSalt(8);
            const hash = await bcrypt.hash(password, salt);

            await db.collection('users').insertOne({
                username,
                password: hash
            });

            return res.redirect('/login');
        } catch (err) {
            console.log(err);

            return res.render('register', {
                title: 'Register',
                tab: 'register',
                error: 'Something went wrong on our side'
            });
        }
    }
};
  
module.exports = indexCtrl;