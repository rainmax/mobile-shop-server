/*图片分享页的数据模型*/
const db = require('../util/db');
const mongoose = require('mongoose');

//每次请求最多返回四张图片
const PAGE_SIZE = 4;

//创建Schema对象
const photoSchema = mongoose.Schema({
    //图片分享的id码
    phoId: Number,

    //多个图片的url地址
    phos: [String],
    
    //图片的介绍
    intro: String,

    //图片的分类
    type: String
});

// 在保存数据之前让他的id自增
photoSchema.pre('save', function (next) {
    photo.find({}, (err, data) => {
        if (err) return console.log(err);

        this.phoId = data.length;
        next();
    });
});

//每保存一个图片，就创建一个图片评论数据模型
photoSchema.post('save', function(doc, next) {
    const photoCoModel = this.model('photoComment');
    
    photoComModel.find({}, (err) => {
        if (err) return console.log(err);

        new photoComModel({
            phoId: doc.phoId,
            comments: []
        }).save(next); 
    })
});

//查找所有的分类
photoSchema.statics.findAllTypes = function (callback) {
    this.model('photo').find({}, {
        type: 1
    }).distinct('type').exec(callback);
};

//通过分页和类型部分查询
photoSchema.statics.findPho = function(pageIdx, type, callback) {
    this.model('photo').find({
        type
    }).skip(PAGE_SIZE * (pageIdx - 1)).limit(PAGE_SIZE).exec(callback);
};

// 通过phoId查询一个图片的信息
photoSchema.statics.findByPhoId = function (phoId, callback) {
    this.model('photo').findOne({
        phoId,
    }, callback);
};

//注册这个模型，并将这个模型给导出
const Photo = db.model('photo', photoSchema);
module.exports = Photo;



