const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
var http = require('http');

/*------------Database connection----------*/
//mongodb://localhost/jiomart
//mongodb+srv://pajitive:serene@1994@allactivejobs.stre9.mongodb.net/jobportal?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://pajitive:serene@1994@allactivejobs.stre9.mongodb.net/jobportal?retryWrites=true&w=majority", {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
 .then((result)=>{
    console.log("Mongodb Database is connected...");
 })
 .catch((err)=>{
    console.log("Database is not connected...", err.message);
 })
/*------------Database connection----------*/

const app = express();
app.use(morgan('combined'));

app.use(cors());

app.use(express.static('client'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true ,parameterLimit:50000}));

app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: (req,file,callBack) =>{
    callBack(null,'./public/product')
  },
  filename: (req,file,callBack) => {
    callBack( null, `product_${file.originalname}`)
  }
})

var imgUpload = multer({storage: storage });

app.post('/productPic', imgUpload.single('file'),(req,res,next)=>{
   const file = req.file
   if(!file){
     const error = new Error("Please upload a file...");
     error.httpStatusCode =400
   }
   res.send({imageUrl: `/product/${req.file.filename}`});
 });
require('./router')(app);

app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname ,'client/index.html'));
});

app.listen( process.env.PORT || 3030,'213.136.93.43', () => {
    console.log("Server is listening on port 3030");
});
