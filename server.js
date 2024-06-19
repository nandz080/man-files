const express = require('express');
//import express from 'express';
const app = express(); // Can also use `const express = require('express');` for CommonJS

const port = process.env.PORT || 5000;
const routes = require('./routes'); // Still require for non-ES modules

app.use('/', routes);

app.listen(port, () => console.log(`Server running on port ${port}`));
