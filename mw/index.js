const indexMw = {
    sample: (_res, _req, next) => {
        console.log('I\'m a middleware');
        next();
    }
};
  
module.exports = indexMw;