const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Templating Language
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const newsRouter = require('./src/routes/news')
// const newsRouterSingle = require('./src/routes/newsSingle')
 
app.use('/', newsRouter)
app.use('/article', newsRouter)

// Listen on port
app.listen(port, () => console.log(`Listening on port ${port}`))