const express = require('express');
const {config} = require('dotenv');
const { fileUpload} = require('./Middleware/fileUpload')
const path = require('path')
const eventRoutes = require('./Routes/eventRoutes')
const morgan = require('morgan')

//ErrorHandlers
const { errorHandler, notFound } = require('./Middleware/errorMiddleware');

const app = express();
config();

//Body parse
app.use(express.json());

//morgan
app.use(morgan('dev'))

//Serve Images Statically
app.use("/uploads/images", express.static(path.join("uploads", "images")));

//CORS ERROR
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Test API
app.get("/api/islive", (req, res) => {
  res.send("Api is Working");
});

//Routes
app.use("/api/v3/app", eventRoutes);

//Upload a Image
app.post("/api/upload", fileUpload.single("image"), (req, res) => {
  const path = "http://localhost:5000/" + req.file.path;
  res.send(path);
});

//404 error
app.use(notFound);

//Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,(err)=>{
    if(err){
      return console.log(err.message);
    }
    console.log(`listen on port ${PORT}`)
  }  
);
