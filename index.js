import express from 'express';
import initKnex from "knex";
import configuration from "./knexfile.js";

const knex  = initKnex(configuration);

const app = express();
app.use(express.json());

app.get('/', function (req,res){
  res.send('Walletwise Api')
})

app.listen(8080, function(){
  console.log('Hello World');
});
