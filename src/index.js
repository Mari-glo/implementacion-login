const express = require('express')
const handlebars = require('express-handlebars')
const routerServer = require('./routes')
const { connectDb } = require('./config/config')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')



const app = express()
const PORT = 8080

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('6274'))
app.use(session({
    secret:'6274',
    resave:true,
    saveUninitialized: true

}))


app.engine('hbs', handlebars.engine({
    extname:'.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(cookieParser())




app.use(routerServer)

app.listen(PORT, ()=>{
    console.log(`escuchando desde puerto ${PORT}`)
})