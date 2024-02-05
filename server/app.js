const express = require("express");
const cors = require("cors")
const path = require("path")
const app = express();
app.use(express.json());
app.use(cors());
const restRoutes= require("./routes/restaurant.routes");
const tableRoutes= require("./routes/tables.routes");
const orderRoutes= require("./routes/order.routes");


app.use('/rest',restRoutes);
app.use('/table',tableRoutes);
app.use('/order',orderRoutes);

app.use((err, req, res, next)=> {
    res.status(400).json({
        status: "fail",
        message: err.message
    })
})

module.exports.app = app;