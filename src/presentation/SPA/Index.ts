import * as Hapi from 'hapi';
import Constants from './../../infra.core/config/constants/constants';
import * as Path from 'path';
let express = require('express'); 
let app     = express();
let path    = require("path");

 
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'content')));
app.all('*', function(req, res, next) {
    res.sendFile('/content/index.html', { root: __dirname });
});

const port = process.env.PORT || Constants.CLIENT.PORT;
const ip = process.env.IP || Constants.CLIENT.HOST;
app.listen(port, ip);

console.log(`Running at Port: ${port}`); 