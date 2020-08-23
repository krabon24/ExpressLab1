const express = require('express');
const port = 3000;
const app = express();
const cartItems = require('./cart-items');
const cors = require("cors");

app.use(express.json());
app.use('/', cartItems);
app.use(cors());

app.listen(port, () => console.log(`listening on port ${port}`));

// module.exports = app;