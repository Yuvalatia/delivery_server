require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const constants = require("./utils/constants");
const routers = require("./routes");

const app = express();

// Body parser
app.use(express.json());

// Settings
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // open to any domain
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
    next();
  });

// ROUTES
app.use("/users", routers.usersRoute);
app.use("/orders", routers.ordersRoute);
app.use("/products", routers.productsRoute);


// Error handler
app.use((err, req, res, next) => {
    if (!res.headerSent) {
     res.status(err.code || 500).json({ message: err.message || "Internal Error" });
    }
  });

app.get("/", async (req, res, next) => {
    res.json("hello scanovate");
});

// Connection to DB
const port = process.env.SERVER_PORT || 5000;
mongoose
  .connect(constants.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() =>
    app.listen(port, () => console.log(`Server Port: ${port} - DB connected`))
  )
  .catch((err) => console.log(err));
