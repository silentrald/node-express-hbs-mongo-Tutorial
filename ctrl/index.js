const indexCtrl = {
    getIndex: (_req, res) => {
        return res.send('Hello World');
    },

    getSample: (_req, res) => {
        return res.send('This is the sample route');
    }
};
  
module.exports = indexCtrl;