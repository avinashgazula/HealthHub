const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/dist/healthhub'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/healthhub/index.html'));
});

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server running on port ${PORT}`));
