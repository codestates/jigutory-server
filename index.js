const express = require('express')
// const https = require('https');
const fs = require('fs')
const cors = require('cors')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const badgeRouter = require('./routes/badge')
const levelRouter = require('./routes/level')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const cafeRouter = require('./routes/cafe')
const controller = require('./controllers/intropage')

require('./models')
const sequelize = require('./models').sequelize
const app = express()

sequelize.sync()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
        credentials: true,
    }),
)

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/badge', badgeRouter)
app.use('/level', levelRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/cafe', cafeRouter)
app.get('/intropage', controller.intropageController)

module.exports = app.listen(port, () => {
    console.log(`🚀 Server is starting on ${port}`)
})

// http 프로토콜 대신 https 프로토콜을 사용 시 사용
// let server;

// if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
//   server = https
//     .createServer(
//       {
//         key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
//         cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
//       },
//       app
//     )
//     .listen(4000);
// } else {
//   server = app.listen(4000)
// }
// console.log(`🚀server listening on https && ${port}`)

// module.exports = server;
