const express = require('express');
const app = express();
var router =require("./router/router.js");
app.get("/",function (req, res) {
    res.send('Hello World!');
  });
app.post("/orderBooks",router.orderBooks);
app.listen(3000);