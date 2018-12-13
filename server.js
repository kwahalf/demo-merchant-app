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

// create our webhook endpoint to recive webhooks from Safaricom
app.post('/hooks/payments', (req, res) => {
  console.log('-----------Received M-Pesa webhook-----------');
  
  // format and dump the request payload recieved from safaricom in the terminal
  console.log(prettyjson.render(req.body, options));
  console.log('-----------------------');
  
  let message = {
    "ResponseCode": "00000000",
    "ResponseDesc": "success"
  };
  
  // respond to safaricom servers with a success message
  res.json(message);
});

app.get('/hooks/validate', (req, res) => {
  console.log('-----------Received M-Pesa webhook-----------');
  
  // format and dump the request payload recieved from safaricom in the terminal
  console.log(prettyjson.render(req.params, options));
  console.log('-----------------------');
  
  let message = {
    "ResponseCode": "00000000",
    "ResponseDesc": "success"
  };
  
  // respond to safaricom servers with a success message
  res.json(message);
});

const server = app.listen(Port, () => {
  let port = server.address().port;
  console.log(`server listening on port ${port}` );
});