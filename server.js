const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const path = require('path');

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

io.on('connection', function(socket){
	console.log("connected");
	socket.on('new-message',function(msg){
		console.log(msg);
		io.emit('receive-message',msg);
    // io.broadcast.emit('receive-message',msg);

	})
  socket.on('test',function(){
    console.log("mounted");
  })
});

const PORT = process.env.PORT || 3000;

http.listen(PORT,function(){
	console.log("we are live");
	console.log("building webpack...");
})