require('./src/db/db')
const cluster = require('cluster')
const os = require('os');
const http = require('http')
const app = require('./app')
const numCpus = os.cpus().length

//for thread worker..
// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} running`)
//     for (let i = 0; i < numCpus; i++) {
//         cluster.fork()
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`)
//     })
// }
// else {
//     const server = http.createServer(app)
//     const port = process.env.PORT || 5000;
//     const host = 'localhsot';
//     server.listen(port, () => {
//         console.log(`server start http://${host}:${port}`)
//     })
//  }

//uncomment below if you want this testing server 👇

const server = http.createServer(app)
const port = process.env.PORT || 5000;
const host = 'localhsot';
server.listen(port, () => {
    console.log(`server start http://${host}:${port}`)
})
