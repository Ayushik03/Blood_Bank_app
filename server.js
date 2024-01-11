const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectdb = require("./config/db");
const path = require("path")
//dot config
dotenv.config();
//mongodb connection
connectdb();
// rest object
const app = express();

// //middlewares
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

//routes
// 1 test route
app.use("/api/v1/test", require("./routes/testroutes"));
app.use("/api/v1/auth", require("./routes/authroute"));
app.use('/api/v1/inventory',require('./routes/inventoryroute'))
app.use("/api/v1/analytics", require("./routes/analyticsroute"));
app.use("/api/v1/admin", require("./routes/adminroute"));

// static folder
app.use(express.static(path.join(__dirname,'./client/build')))

// static routes
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `server is running  in ${process.env.DEV_MODE} mode on port ${process.env.PORT} `
      .bgBlue.white
  );
});
