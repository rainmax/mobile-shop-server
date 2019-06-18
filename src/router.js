/* 路由处理模块
*
* 不同请求对应不同的路由处理
*/

const Corver = require('./models/cover');
const News = require('./models/news');
const NewsComment = require('./models/newsComment');
const Photo = require('./models/photo');
const PhotoComment = require('./models/photocomment');
const Goods = require('./models/Goods.js');
const GoodsComment = require('./models/GoodsComment.js');

const xss = require('xss');

//轮播图路由处理，对应/get/lunbotu
exports.getCorver = function (req, res) {
    Corver.find().then( (data) => {
        // JSON.parse(JSON.stringify(data[0]));
        var result = data[0];
        result.status = 1;
        res.json(result);
    },
    (err) => {
        res.send({
            status: -1
        });
    })
}


//------------新闻模块路由-----------

/**
 * 通过页码来查询新闻
 */
exports.findNewsByPageIdx = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    News.findByPage(pageIdx, (err, data) => {
        //返回状态码 -1
        if (err || data.length < 1) return res.send({
            status: -1
        });

        //发送JSON数据
        res.send({
            status: 1,
            news: data
        });
    });
};

/**
 * 通过新闻id来查询新闻的详细内容
 * 每一次查询就相当于用户访问了一次
 */
exports.findNewsById = function (req, res) {
    let newsId = req.query.newsId;
    if (!newsId) newsId = 1;

    News.clicked(newsId, () => {
        News.find({
            id: newsId
        }, (err, data) => {
            if (err || !data.length) return res.send({
                status: -1
            });

            //发送JSON数据
            res.send({
                status: 1,
                news: data[0]
            })
        })
    })
}

/**
 * 根据新闻id和页码查找部分评论
 */
exports.getNewsComment = function (req, res) {
    var pageIdx = parseInt(req.query.pageIdx || 1);
    pageIdx = pageIdx < 0 ? 1 : pageIdx;
    const newsId = parseInt(req.query.newsId || 0);
    NewsComment.findComByPageIdx(newsId, pageIdx, function (err, data) {
        if (err || !data.comments.length) return res.send({
            status: -1
        });
        
        res.send({
            status: 1,
            comments: data.comments
        });
    });
};


/**
 * 用户提交的评论由该方法处理
 */
exports.addNewsComment = function (req, res) {
    // 获取新闻id
    const newsId = parseInt(req.body.newsId || req.query.newsId || 0);
    // 构建comment对象
    const comment = {
        username: req.body.username,
        comDate: new Date(),
        content: xss(req.body.content)
    };

    // 将数据存到数据库
    NewsComment.addComment(newsId, comment, (err, data) => {
        if(err || data.n < 1) return res.send({
            status: -1
        });
        //发送JSON数据
        res.send({
            status: 1
        });
    });
};

//--------------新闻模块结束--------------


//---------------图片路由模块--------------
/**
 * 获取所有的图片分类信息
 */
exports.getPhoTypes = function (req, res) {
    Photo.findAllTypes((err, data) => {
        if (err) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            types: data
        });
    });
};

/**
 * 根据页码和类型取得图片信息
 */
exports.getPhos = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);

    //如果没有指定查询类型就查询全部
    let type = req.query.type || /.*/;
    type = (type === '全部' ? /.*/ : type);

    Photo.findPho(pageIdx, type, (err, data) => {
        if (err || !data.length) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            phos: data
        });
    });
};

/**
 * 通过图片id查找图片的详细信息
 */
exports.getPhoDetail = function (req, res) {
    const phoId = parseInt(req.query.phoId || 0);
    Photo.findByPhoId(phoId, (err, data) => {
        if (err) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            pho: data
        });
    });
}

/**
 * 根据图片id和页面查找图片的评论
 */
exports.getPhoComByPage = function (req, res) {
    const phoId = parseInt(req.query.phoId || 0);
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    PhotoComment.findByPageIdx(phoId, pageIdx, (err, data) => {
        if (err || !data) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            comments: data.comments
        });
    });
};

/**
 * 添加图片评论
 */
exports.addPhoComment = function (req, res) {
    const phoId = parseInt(req.query.phoId || 0);
    const comment = {
        username: '匿名',
        content: req.body.content
    };

    PhotoComment.addComment(phoId, comment, (err, data) => {
        if (err || !data) return res.send({
            status: -1
        });

        res.send({
            status: 1
        });
    });
}

//-------------图片模块结束------------------

//-------------------商品模块开始--------------
/**
 * 通过页码查询商品信息
 */
exports.getGoodsByPageIdx = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx < 0 ? 1 : pageIdx;

    Goods.findByPage(pageIdx, (err, data) => {
        //如果发生错误或者查询不到数据，返回状态码-1
        if (err || data.length < 1) return res.send({
            status: -1
        });

        //发送JSON数据
        res.send({
            status: 1,
            gods: data
        });
    });
};

/**
 * 通过商品id分页查询商品的所有评论
 */
exports.getCommentByGodId = function (req, res) {
    let godId = parseInt(req.query.godId || 0);
    let pageIdx = parseInt(req.query.pageIdx || 1);
    pageIdx = pageIdx < 0 ? 1 : pageIdx;
    
    GoodsComment.findByPageIdx(godId, pageIdx, (err, data) => {
        if (err || !data.comments.length) return res.send({
            status: -1
        })

        res.send({
            status: 1,
            comments: data.comments
        });
    });
};

/**
 * 通过商品id获取商品的详细信息
 */
exports.findGodDetailById = function (req, res) {
    let godId = parseInt(req.query.godId || 0);

    Goods.findOne({
        godId,
    }, (err, data) => {
        if (err) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            god: data
        });
    });
};

/**
 * 添加商品评论
 */
exports.addGodComment = function (res, req) {
    const godId = parseInt(req.body.godId || req.query.godId || 0);

    //构建评论信息
    const comment = {
        username: req.body.username,
        comDate: new Date(),
        content: xss(req.body.content)
    };

    // 将评论添加进数据库
    GoodsComment.addComment(godId, comment, (err, data) => {
        if (err || data.n < 1) return res.send({
            status: -1
        });

        res.send({
            status: 1,
        });
    });
};





