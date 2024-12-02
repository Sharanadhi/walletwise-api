import express from 'express';
import cors from "cors";
import initKnex from "knex";
import configuration from "./knexfile.js";
import signinRoutes from './routes/signin-signup-routes.js';

const knex  = initKnex(configuration);
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req,res){
  res.send('Walletwise Api')
})

app.use('/api/userauth', signinRoutes);

app.listen(8080, function(){
  console.log('Hello World');
});
