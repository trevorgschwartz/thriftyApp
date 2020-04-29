const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../dist'));

const routes = require('./routes/routes.js');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

  