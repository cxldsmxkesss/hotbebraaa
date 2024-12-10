'use strict';

const express = require('express');
const app = express();

// middleware 
app.use('/assets', express.static(process.cwd() + '/dist/assets'));
app.use('/dist', express.static(__dirname + '/dist'));


// routes
app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html');
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})