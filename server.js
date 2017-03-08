const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const path = require('path');
var rest = require('./rest.js');

var Datastore = require('nedb');  
var db = new Datastore({filename: 'chatLog.db',autoload:true});

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static(path.join(__dirname, 'public'), {
  dotfiles: 'ignore',
  index: false
}));

app.get('*', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
  // console.log(req);
  // res.json({"Error" : true, "Message" : "Error executing MySQL query"});
  res.sendFile(path.join(__dirname, 'index.html'));
});

function REST(){
    var self = this;
    self.configureExpress();
};

REST.prototype.configureExpress = function() {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/', router);
      var rest_router = new rest(router,db);
      self.startServer();
}

io.on('connection', function(socket){
	console.log("connected");
	socket.on('new-message',function(msg){
		console.log(msg);
    // chatLog.data.push(msg);
    // console.log(chatLog.data);
		io.emit('receive-message',msg);
    // console.log(chatLog.data[chatLog.data.length-1]);
    // io.broadcast.emit('receive-message',msg);

	})
  socket.on('test',function(){
    console.log("mounted");
  })
});

const PORT = process.env.PORT || 3000;

REST.prototype.startServer = function() {
  http.listen(PORT,function(){
    console.log("we are live at localhost:",PORT);
    console.log("building webpack...");
  })      
}

new REST();