// server.js
// where your node app starts

// init project
var express = require('express');
var dotenv = require('dotenv');
var app = express();
var moment = require('moment');
var time = require('./model/time.js');
var util = require('./service/util.js');

dotenv.config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

/**
 * @description enum date type
 * @alias UTC: Universal Time Coordinator
 */
const DATE_TYPE = {
  UTC: 1,
  UNIX: 0,
  INVALID: -1,
  EMPTY: undefined
}

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  const isDate = util.isDate(date);
  let result = {};
  let unix = -1;
  let utc = new Date();

  if (isDate === DATE_TYPE.UTC) {
    const utcDate = moment.utc(date).toDate();
    unix = Date.parse(utcDate);
    utc = utcDate.toUTCString();
    result = new time.TimeDto(unix, utc);
  } else if (isDate === DATE_TYPE.UNIX) {
    utc = new Date(Number(date)).toUTCString();
    unix = Number(date);
    result = new time.TimeDto(unix, utc);
  } else if (date == DATE_TYPE.EMPTY) {
    date = new Date();
    unix = Date.parse(date);
    utc = new Date(date).toUTCString();
    result = new time.TimeDto(unix, utc);
  } else {
    result = { error: "Invalid Date" };
  }
  console.log(unix);
  console.log(utc);
  console.log(result);
  console.log('----------------');

  res.send(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
