/*news新闻信息模型*/


const db = require('../util/db');
const mongoose = require('mongoose');

//一页有8条数据
const PAGE_SIZE = 8;

// 设计Schema
const NewsSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    add_time: {
        type: Date,
        defalut: new Date()
    },
    clicked: {
        type: Number,
        default: 0
    },
    img_url: String,
    title: String,
    summary: String,
    content: String
})

//向Model添加静态方法，方便分页查找
NewsSchema.statics.findByPage = function (pageIdx, callback) {
    this.model('news').find({}).skip(PAGE_SIZE * (pageIdx - 1)).limit(PAGE_SIZE).exec(callback);
}

//点击文章后，对应点击数+1
NewsSchema.statics.clicked = function (newsId, callback) {
    this.model('news').update({
        id: newsId
    }, {
        $inc: {
            'clicked': 1
        }
    }, callback)
};

//每次保存一条新闻前，让它id自增
NewsSchema.pre('save', function (next) {
    this.model('news').find({}, (err, data) => {
        if (err) return console.log(err);

        this.id = data.length;
        next();
    })
})

//保存一条新闻后，为它增加评论模型
NewsSchema.post('save', function (doc, next) {
    const newComModel = this.model('newscomment');
    newComModel.find({}, (err) => {
        if (err) return console.log(err);
    
        new newComModel({
            newsId: doc.id,
            comments: []
        }).save(next);
    });
});

module.exports = db.model('news', NewsSchema);

