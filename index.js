import express from 'express';
import cors from "cors";
import initKnex from "knex";
import configuration from "./knexfile.js";
import signinRoutes from './routes/signin-signup-routes.js';
import transactionRoutes from './routes/transactions-routes.js'
const knex  = initKnex(configuration);
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req,res){
  res.send('Walletwise Api')
})

app.use('/api/userauth', signinRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(8080, function(){
  console.log('Server running on http://localhost:8080/');
});
