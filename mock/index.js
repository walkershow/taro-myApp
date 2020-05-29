//const delay = require('mocker-api/utils/delay'); // 延时 模拟请求异步问题
const mockjs = require('mockjs');
const data={
    'GET /users':{
        data:{
            id:1,
            name:"2b",
            password:"2b2b"
        },
        statusCode:200
    }
}
module.exports = data
