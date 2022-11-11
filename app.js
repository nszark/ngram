'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

var information = [];

app.use(express.json());

app.get("/api/",(req,res) => {
    return res.status(200).send(information)
})

app.get("/api/:id",(req,res) => {
    const idRequest = req.params["id"];

    return res.status(200).send(information.find(element => element.id === idRequest).book)
})

app.post("/api/add",(req, res) => {
    const bookRequest = req.body["book"];

    information.push({
        id: uuidv4(),
        book: bookRequest
    });

    return res.status(200).send(information)
  })


app.put("/api/update/:id", (req,res) => {
    const bookRequest = req.body["book"];
    const idRequest = req.params["id"];

    information.find(element => element.id === idRequest).book = bookRequest;

    return res.status(200).send(`Changed the book name to ${bookRequest}.`)
})

app.delete("/api/delete/:id", (req,res) => {
    const idRequest = req.params["id"];

    const index = information.indexOf(information.find(element => element.id === idRequest));
    if (index > -1) { 
        information.splice(index, 1); 
    }

    return res.status(200).send("Deleted the book.")
})
  
app.listen(5000);