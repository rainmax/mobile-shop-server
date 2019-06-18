//定义图片的评论数据模型

const db = require('../util/db');
const mongoose = require('mongoose');

//一次查询8张图片信息
const PAGE_SIZE = 8;

const photoCommentSchema = new mongoose.Schema({
    //一个photo对应一组评论
    phoId: Number,
    comments: [{
        //评论id
        comId: Number,
        //用户名
        username: {
            type: String,
            defalut: '匿名'
        },
        //评论日期
        comDate: {
            type: Date,
            defalut: new Date()
        },
        //评论内容
        content: String
    }]
})

//通过phoId查询评论
photoCommentSchema.statics.findComById = function (phoId, callback) {
    this.model('photocomment').find({
        phoId,
    }, callback);
};

//通过图片id分页查询图片评论
photoCommentSchema.statics.findByPageIdx = function (phoId, pageIdx, callback) {
    const limStart = PAGE_SIZE * (pageIdx - 1);

    this.model('photocomment').findOne({
        phoId,
    }, {
        comments: {
            $slice: [limStart, limStart + PAGE_SIZE]
        }
    }).exec(callback);
}

//添加评论方法
photoCommentSchema.statics.addComment = function (phoId, comment, callback) {
    this.model('photocomment').find({
        phoId,
    }, (err, data) => {
        if (err) return console.log(err);

        //id自增
        comment.comId = data.comments.length;
        data.comments.push(comment);
        //保存修改
        data.save(callback);
    })
};

//      
module.exports = db.model('photocomment', photoCommentSchema);