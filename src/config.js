//服务器的配置文件

const host = 'localhost'
const port = '8888'
const dbName = 'mobile'

//mongoes数据库连接地址
const url = `mongodb://${host}:27017/${dbName}`

module.exports = {
    url,
    port
}