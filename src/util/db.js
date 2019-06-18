var mongoose = require('mongoose');
var config = require('../config');

var db = mongoose.createConnection(config.url, {
    useNewUrlParser: true,
    autoIndex: true
});

// 向外暴露数据库连接对象
module.exports = db;