import * as Hapi from 'hapi';
import Constants from './../../infra.core/config/constants/constants';
import * as Path from 'path';
let express = require('express'); 
let app     = express();
let path    = require("path");

 
app.use('/content', express.static(__dirname + '/content'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use(express.static(path.join(__dirname, 'public')));    

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/content/index.html')); 
});

const port = process.env.PORT || Constants.CLIENT.PORT;
const ip = process.env.IP || Constants.CLIENT.HOST;
app.listen(port, ip);

console.log(`Running at Port`); 