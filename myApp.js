require('dotenv').config()
let express = require('express');
let app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

console.log("Hello World")
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


 module.exports = app;
