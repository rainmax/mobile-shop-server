/* 新闻评论模型 */

const db = require('../util/db');
const mongoose = require('mongoose');

//一页加载8条评论
const PAGE_SIZE = 8

//创建一个Schema
var NewsCommentSchema = new mongoose.Schema({
    newsId: Number,
    comments: [{
        comId: {
            type: Number,
        },
        username: {
            type: String,
            default: '匿名'
        },
        comDate: {
            type: Date,
            defalut: new Date()
        },
        content: String
    }]
});

//通过新闻id和页数来查询评论
NewsCommentSchema.statics.findComByPageIdx = function (id, pageIdx, callback) {
    const limStart = PAGE_SIZE * (pageIdx - 1);
    this.model('newscomment').findOne({
        newsId: id
    }, {
        comments: {
            $slice: [limStart, limStart + PAGE_SIZE]
        }
    }).exec(callback);
};

//添加评论
NewsCommentSchema.statics.addComment = function (newsId, comment, callback) {
    this.model('newscomment').findOne({
        newsId: newsId
    }, (err, data) => {
        if (err) return console.log(err);

        var commentList = data.comments;
        comment.comId = commentList.length;

        data.comments.push(comment);

        //继续修改这里的内容
        data.save(callback);
    })
}

const Comment = db.model('newscomment', NewsCommentSchema);
module.exports = Comment;