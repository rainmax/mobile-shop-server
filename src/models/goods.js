const db = require("../util/db.js");
const mongoose = require('mongoose');

const PAGE_SIZE = 8;

//创建商品Goods的数据模型
const GoodsSchema = mongoose.Schema({
    //商品的id号
    godId: Number,
    //商品的名称
    name: String,
    //商品的原价
    oldPrice: Number,
    //商品的现价
    newPrice: Number,
    //商品的文字介绍
    intro: String,
    //商品的库存
    quantity: Number,
    //商品的编号
    godNum: String,
    //商品的添加日期
    addDate: {
        type: Date,
        default: new Date()
    },
    //商品的图片介绍
    phos: [String],
    //商品的多个图文介绍的图片地址
    imgIntro: [String]
})

//添加保存商品信息之前让商品的id自增
GoodsSchema.pre('save', function (next) {
    this.model('goods').find({}, (err, data) => {
        if (err) return console.log(err);

        this.godId = data.length;
        next();
    });
});

// 在商品添加完成之后生成对应的评论
GoodsSchema.post('save', function (doc, next) {
    const comModel = this.model('goodscomment');

    comModel.find({}, (err) => {
        if (err) return console.log(err);
        new comModel({
            godId: doc.godId,
            comments: []
        }).save(next);
    });
})

//分页查找商品评论
GoodsSchema.statics.findByPage = function (pageIdx, callback) {
    this.model('goods').find({}).skip(PAGE_SIZE * (pageIdx - 1)).limit(PAGE_SIZE).exec(callback);
};

//注册goods Model
module.exports = db.model('goods', GoodsSchema);