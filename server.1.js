var express = require('express')
var app = express()

app.use(require('connect-history-api-fallback')())
app.use(express.static('./dist'))
// app.use(express.static(__dirname  + '/dist'))

module.exports = app.listen(8099, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost: 8099 \n')
})
