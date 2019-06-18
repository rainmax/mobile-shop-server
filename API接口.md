### 轮播图模块


获取轮播图 http://localhost:3000/api/getcover

接口示例：
```javascript
{"imgs":["https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2237275641,3286268943&fm=26&gp=0.jpg"}
```

### 新闻模块
分页获取新闻[GET]  http://localhost:8888/api/getnews

 参数|类型|说明|
 -|-|- 
pageIdx|Number|表示获取第几页的数据|
接口示例：

```javascript
{
    "status":1,
    "news":[
        {
            "clicked":15,"_id":"5cd16bb0349f7e29d05e0a0c","add_time":"2019-05-07T11:27:44.472Z",
            "title":"中欧班列“长安号”首列跨境电商出口专列开行",
            "img_url":"https://t10.baidu.com/it/u=208545735,2881720590&fm=173&app=49&f=JPEG?w=218&h=146&s=8EF04D96EA9010C8520699F50300F021",
            "summary":"熊猫头摘要9",
            "content":"<h4>熊猫四级标题</h4><p>熊猫熊猫头</p>","id":6
        }
    ]
}
```

根据新闻id查询新闻详情[GET]http://localhost:8888/api/getnewdetail
参数|类型|说明|
 -|-|- 
newsId|Number|新闻的ID|
接口示例：
```javascript
{
    "status":1,
    "news":{
        "clicked":39,
        "add_time":"2019-05-07T11:27:44.472Z",
        "title":"携程集团创始人范敏卸任法定代表人 杨涛接任",
        "img_url":"https://t11.baidu.com/it/u=173348053,1592801891&fm=173&app=49&f=PNG?w=218&h=146&s=5A52C8125D787C090EE5E0DA030050B3",
        "summary":"熊猫头摘要5",
        "content":"<h4>熊猫四级标题</h4><p>熊猫熊猫头</p>",
    }
}
```

获取新闻评论[GET]http://localhost:8888/api/getnewscom
参数|类型|说明|
 -|-|- 
newsId|Number|新闻的ID|
pageIdx|Number|评论的页码|
接口示例：
```javascript
{
    comments: [
        {comId: 1, username: 'username', comDate: , content: }
    ]
}
```

提交新闻评论[POST]http://localhost:8888/api/addnewscom
参数|类型|说明|
 -|-|- 
newsId|Number|新闻的ID|
body|Object|提交的评论对象信息|
接口示例：
```javascript
{
    username: 'username',
    content: '这个是我的内容'
}
```

###图片模块

获取图片类型[GET]http://localhost:8888/api/getphotypes
参数|类型|说明|
 -|-|- 
接口示例：
```javascript
{
    status: 1
    types: ['清纯美女', '动漫']
}
```

分页获取对应类型的图片信息[GET]http://localhost:8888/api/getphos
参数|类型|说明|
 -|-|- 
 pageIdx|Number|图片的页码
 type|String|图片的类型
 Note:如果type为空则表示获取所有类型的图片

接口示例：
```javascript
{
    status: 1,
    phos: [{
        phoId: 1,
        type: '类型',
        phos: ['图片1', '图片2']
    }]
}
```

根据图片ID获取详细信息[GET]http://localhost:8888/api/getphodetail
参数|类型|说明|
 -|-|- 
 phoId|Number|图片的ID
接口示例：
```javascript
{
    "status":1,
    "pho":{
        "phos":["http://img4.imgtn.bdimg.com/it/u=3390151971,3163274447&fm=26&gp=0.jpg","http://img1.imgtn.bdimg.com/it/u=3236158123,3686147926&fm=26&gp=0.jpg2","http://img4.imgtn.bdimg.com/it/u=2465494204,1178502384&fm=26&gp=0.jpg"],
        "intro":"动漫可爱妹子",
        "phoId":1,
        "type":"动漫",
    }
}
```


根据图片ID获取评论[GET]http://localhost:8888/api/getphocom
参数|类型|说明|
 -|-|- 
 phoId|Number|图片的ID
 pageIdx|Number|评论的页码
接口示例：
```javascript
{
    comId: 0,
    username: '匿名',
    comDate: '2019-05-08T02:56:03.187+00:00',
    content: '沙发'
}
```

###商品模块
分页获取商品列表信息[GET]http://localhost:8888/api/getgod
参数|类型|说明|
 -|-|- 
 pageIdx|Number|商品的页码
接口示例：
```javascript
{
    status: 1,
    gods: [
        {
            godId: 0,
            oldPrice: 999,
            newPrice: 699,
            addDate: '2019-05-10T07:54:29.984Z',
            intro: '商品的文字介绍',
            phos: ['商品图片一', '商品图片二'],
            imgIntro: ['图文介绍一', '图片介绍2],
            name: '商品名称',
            quantity: 30,
            godNumber: '201801160604531',
        }
    ]
}
```

获取商品详细信息[GET]http://localhost:8888/api/getgoddetail
参数|类型|说明|
 -|-|- 
 godId|Number|商品的ID
接口示例：
```javascript
{
    status: 1,
    god: {
            godId: 0,
            oldPrice: 999,
            newPrice: 699,
            addDate: '2019-05-10T07:54:29.984Z',
            intro: '商品的文字介绍',
            phos: ['商品图片一', '商品图片二'],
            imgIntro: ['图文介绍一', '图片介绍2],
            name: '商品名称',
            quantity: 30,
            godNumber: '201801160604531',
        }
}

```









