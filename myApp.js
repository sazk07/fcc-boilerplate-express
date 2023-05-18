require('dotenv').config()
const bodyParser = require('body-parser')
let express = require('express');
let app = express();

console.log("Hello World")

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

const file1 = __dirname + '/views/index.html'
app.get("/", (req, res) => {
  res.sendFile(file1)
})

const file2 = __dirname + '/public'
app.use("/public", express.static(file2))

app.get("/json", (req, res) => {
  const mySecret = process.env.MESSAGE_STYLE
  const capitalizedMessage = res.json({
    "message": "HELLO JSON"
  })
  const normalMessage = res.json({
    "message": "Hello json"
  })
  (mySecret == "uppercase") ? capitalizedMessage : normalMessage
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({
    time: req.time
  })
})

app.get("/:word/echo", (req, res) => {
  const word = req.params.word
  res.json({
    echo: word
  })
})

app.use(bodyParser.urlencoded({extended: false}))

app.route("/name")
  .get((req, res) => {
    const queryString= req.query
    res.json({
      name: `${req.query.first} ${req.query.last}`
    })
  })

module.exports = app;
