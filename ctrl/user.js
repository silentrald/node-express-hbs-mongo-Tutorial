

const userCtrl = {
    getUser: (req, res) => {
        const { username } = req.session.user;
        
        return res.render('user/index', {
            title: username,
            username
        });
    }
};

module.exports = userCtrl;