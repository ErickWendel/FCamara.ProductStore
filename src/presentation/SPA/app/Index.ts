import * as Hapi from 'hapi';
import Constants from './../../../infra.core/config/constants/constants';
import Routes from './routes/Routes';
import { ProductController } from './controllers/ProductController';
import * as Path from 'path';
const express = require('express'); 

var app     = express();
var path    = require("path");

 
app.use('/content', express.static(__dirname + '/content'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use(express.static(path.join(__dirname, 'public')));    

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname, '/content/index.html')); 
});
  
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");

console.log("Running at Port 3000"); 