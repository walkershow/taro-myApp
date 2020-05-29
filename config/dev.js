const path = require('path');
const isH5=process.env.CLIENT_ENV==='h5'
const HOST="http://192.168.1.181:8011"
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
      HOST:isH5?"/api":HOST
  },
  weapp: {},
  h5: {
      devServer:{
          port:9000,
          host:"0.0.0.0",
          proxy:{
              '/':{
                  target:HOST,
                  pathRewrite:{
                      '^/':'/'
                  },
                  changeOrigin:true
              }
          }

      }
  }
}
