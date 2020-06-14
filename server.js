const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/health-hub-a2/<name-of-app>'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/health-hub-a2/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);