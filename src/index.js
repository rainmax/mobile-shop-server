const express = require('express')
const port = require('./config').port
const router = require('./router')

const app = express()

// 引入json解析中间件
const bodyParser = require('body-parser')
// 添加json解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

// 允许所有的请求形式
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

//轮播图请求
app.get('/api/getlunbotu', router.getCorver);

//新闻列表信息请求
app.get('/api/getnews', router.findNewsByPageIdx);

//新闻详情请求
app.get('/api/getnewdetail', router.findNewsById);

//新闻评论请求
app.get('/api/getnewscom', router.getNewsComment);

//新闻评论添加请求
app.post('/api/addnewscom', router.addNewsComment);

//图片类型获取请求
app.get('/api/getphotypes', router.getPhoTypes);

//根据类型获取图片
app.get('/api/getphos', router.getPhos);

/**
 * 图片详细信息获取请求
 * phoId：图片集的id
 */
app.get('/api/getphodetail', router.getPhoDetail);

/**
 * 图片评论获取请求
 * phoId：图片集的id
 * pageIdx: 评论的页码
 */
app.get('/api/getphocom', router.getPhoComByPage);

/**
 *商品列表获取请求
 *pageIdx: 显示页码 
 */
app.get('/api/getgod', router.getGoodsByPageIdx);

/**
 * 商品评论获取请求
 * godId: 商品id
 * pageIdx: 评论页码
 */
app.get('/api/getgodcom', router.getCommentByGodId);

/**
 * 商品详细信息获取请求
 * godId: 商品id
 */
app.get('/api/getgoddetail', router.findGodDetailById);

/**
 * 商品评论添加请求
 */
app.post('/api/addgodcom', router.addGodComment);


//匹配404
app.get('*', (req, res) => {
    res.send('没有找到网页');
})

app.listen(port, () => {
    console.log('server start......')
})

