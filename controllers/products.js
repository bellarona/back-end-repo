// var Message = require('../models/Message');

module.exports = {

    get: function (req, res){
        var dataFile = req.app.get('appData');
        res.send(dataFile.products);
    }
};
