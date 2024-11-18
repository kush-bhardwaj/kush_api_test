require('./src/db/db')
const http = require('http')
const app = require('./app')
const server =http.createServer(app)
const port =5000;
const host ='localhsot';
server.listen(port ,()=>{
    console.log(`server start http://${host}:${port}`)
})
