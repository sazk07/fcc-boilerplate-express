require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

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
  const message = "Hello json"
  const conditionalMsg = (mySecret === "uppercase") ? message.toUpperCase() : message
  res.json({message: conditionalMsg})
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
  const { word } = req.params
  res.json({
    echo: word
  })
})

app.use(bodyParser.urlencoded({extended: false}))

app.route("/name")
  .get((req, res) => {
    const { first: firstName, last: lastName } = req.query
    res.json({
      name: `${firstName} ${lastName}`
    })
  })
  .post((req, res) => {
    const queryString = req.body
    res.json({
      name: `${queryString.first} ${queryString.last}`
    })
  })

module.exports = app;
