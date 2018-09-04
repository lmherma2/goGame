const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.promise = global.Promise;
const app = express();
const controller = require("./controllers/GameController");
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/goGame");


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// // Serve up static assets (usually on heroku)
// try {
//   app.get('*', (req, res) => {
//     if (process.env.NODE_ENV === 'production') {
//       res.sendFile(__dirname + '/client/build/index.html');
//     } else {
//       res.sendFile(__dirname + '/../client/public/index.html');
//     }
//   });

// } catch (err) {
//   console.log(`Error: ${err.message}`);
// }

// Add routes, both API and view
app.get('/', function (req, res) {
    res.send(controller.findAll())
  })

app.post('/post', function (req, res) {
    controller.create(req.body)
    res.send("post successful")
  })

// Connect to the Mongo DB

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/public')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
    });
 }

// Start the API server
app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

