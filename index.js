const express = require("express");
require("dotenv").config();


const app = express();

// Body parser
app.use(express.json());

// ROUTES
app.get("/", async (req, res, next) => {
    res.json("hello scanovate");
});

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log(`server listen on port ${port}`));