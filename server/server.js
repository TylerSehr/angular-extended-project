//generic server template with express and bodyparser
//npm -v gives npm info, use for debugging node???
console.log('server.js is working');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.listen(PORT, function(){
    console.log('app is running on port', PORT);
})

app.use(bodyParser.json()); // This line is required for Angular
//body parser has to run before the routes, put the routes below it on this page



