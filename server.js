const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const webapp = express();

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  })
);

webapp.use(express.static(path.join(__dirname, './client/build')));

webapp.use(cors());

webapp.post('/api/login', (req, res) => {
  const { firstName, lastName } = req.body;
  if (firstName && lastName) {
    if (process.env.SPECIAL_KEY) {
      res.status(200).json({"msg": "Welcome!"});
    } else {
      res.status(500).json({"msg": "Did not set the environment variable!"});
      console.error("DID NOT SET ENV VARIABLE!");
      process.exit(1);
    }
  } else {
    res.status(400).json({"msg": "Error in body!"});
  }
});

// Root endpoint
// TODO: alter for deployment
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
