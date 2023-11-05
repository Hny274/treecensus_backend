const express = require("express");
const app = express();

const authenticationRouter=require("./router/route");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/auth",express.urlencoded({extended:true}),authenticationRouter);

// app.all('*',(req,res,next)=>{
//     const err=new Error("can't find ${req.originalUrl} on the server!" );
//     err.status="fail";
//     err.statusCode=404;
//     next(err);
// });

// app.use((error,req,res,next)=>{
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || "error";
//     res.status(error.statusCode).json({
//         status:error.statusCode,
//         message:error.message
//     });
// });

const port = process.env.PORT || 2000; 
app.listen(port,console.log(`Server is listening on port ${port}`));
