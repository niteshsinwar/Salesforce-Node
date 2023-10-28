const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const secretKey = 'your_secret_key'; // Replace with your secret key.
const accessToken='0';
const salesforceToken ='1';
// Route for user authentication and token generation.
app.post('/authenticate', (req, res) => {
  // Authenticate the user (e.g., username and password).
  const username = req.body.username;
  console.log('username',username);
  const password = req.body.password;
  console.log('password',password);
  // If authentication is successful, generate an access token.
  if (username === 'valid_user' && password === 'password') {
     accessToken = jwt.sign({ username }, secretKey);
    console.log('accessToken',accessToken);
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Secure route to receive the Account data from Salesforce.
app.post('/salesforce/account', (req, res) => {
  salesforceToken = req.header('Authorization');
  console.log('salesforceToken',salesforceToken);

  /*jwt.verify(salesforceToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const accountData = req.body;
    console.log('Received Account Data:');
    console.log(accountData);


    res.status(200).json({ message: 'Account data received successfully' });
  });*/
  

    if (salesforceToken==accessToken) {
 
    const accountData = req.body;
    console.log('Received Account Data:');
    console.log(accountData);

    res.status(200).json({ message: 'Account data received successfully' });
  };

});

const port = 3000; // Set the port you want to use.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
