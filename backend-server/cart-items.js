const express = require('express');
const cartItems = express.Router();

const myCartItems = [
    { id: 1, product: "cookies", price: 3.49, quantity: 2},
    { id: 2, product: "noodles", price: 1.15, quantity: 4},
    { id: 3, product: "gravy", price: 2.07, quantity: 1}
];

cartItems.get('/cart-items', (req, res) => {
    let items = myCartItems;

    if (!items) {
        res.sendStatus(200);
    }

    if (req.query.maxPrice) {
        items = items.filter(c => c.price <= req.query.maxPrice);
    }

    if (req.query.prefix) {
        items = items.filter(c => c.product.startsWith(req.query.prefix));
    }

    if (req.query.pageSize) {
        items = items.slice(0, req.query.pageSize);
    }

    res.send(items);
})

cartItems.get('/cart-items/:id', (req, res) => {
    const items = myCartItems.find(c => c.id == req.params.id);
    if (!items) {
        res.sendStatus(404);
    }
    res.sendStatus(200).send(items);
})

cartItems.post('/cart-items', (req, res) => {
    const items = {
        id: req.body.id,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    }
    myCartItems.push(items);
    res.sendStatus(201).send(items);
})

cartItems.put('/cart-items/:id', (req, res) => {
    const itemsWithCorrectId = myCartItems.find(c => c.id == req.params.id);
    const indexOfCorrectItem = myCartItems.indexOf(itemsWithCorrectId);
    myCartItems[indexOfCorrectItem] = {
        id: itemsWithCorrectId.id,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    }
    res.send(myCartItems[indexOfCorrectItem]);
})

cartItems.delete('/cart-items/:id', (req, res) => {
    const deleteP = myCartItems.find(c => c.id == req.params.id);
    const deleteL = myCartItems.indexOf(deleteP);
    myCartItems.splice(deleteL, 1);
    res.sendStatus(204);
})

module.exports = cartItems;