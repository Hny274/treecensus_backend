const express = require("express");
const app = express();


const authenticationRouter=require("./router/route");
const treecensusRouter=require("./router/treecensus_route");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/auth",express.urlencoded({extended:true}),authenticationRouter);

app.use("/api/v1/treecensus",express.urlencoded({extended:true}),treecensusRouter);

const port = process.env.PORT || 2000; 
app.listen(port,console.log(`Server is listening on port ${port}`));
