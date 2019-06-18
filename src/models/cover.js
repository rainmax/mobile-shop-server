/*封面的图片*/

const db = require('../util/db');
const mongoose = require('mongoose');

//设计表结构
const CoverShema = mongoose.Schema({
    imgs: [String]
});

module.exports = db.model('cover', CoverShema);