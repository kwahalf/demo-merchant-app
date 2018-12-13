const prettyjson = require('prettyjson');
const express = require('express');
const bodyParser = require('body-parser')

const options = {
  noColor: true
};

const Port = process.env.PORT || 5000;

// create an express app and configure it with boadyParser middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create our webhook endpoint to recive webhooks from Angaza IPN
app.post('/hooks/payments', (req, res) => {
  console.log('-----------Received Payment Notification From Angaza IPN-----------');
  
  // format and dump the request payload recieved from safaricom in the terminal
  console.log(req.body);
  console.log('-----------------------');
  
  let message = {
    "Status": "SUCCESS"
  };
  
  res.json(message);
});

app.get('/hooks/validate', (req, res) => {
  console.log('-----------Recieved Reference Validation Request From Angaza IPN-----------');
  
  console.log(prettyjson.render(req.query, options));
  console.log('-----------------------');
  
  let message = {
    "valid": true
  };
  

  res.json(message);
});

const server = app.listen(Port, () => {
  let port = server.address().port;
  console.log(`server listening on port ${port}` );
});