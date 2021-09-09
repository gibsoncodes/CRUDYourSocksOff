const express = require('express')
const app = express()
const cors = require('cors')

const sockController = require('./controllers/sock.js')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(sockController)
app.set("port", process.env.PORT || 4000)

const Sock = require('./models/sock')
Sock.deleteMany({})
.then( () => {
    console.log("hi")
})
.then(console.log)
.catch(console.error)

app.get('/', (req,res) => {
    res.redirect('/socks')
})


app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`)
})