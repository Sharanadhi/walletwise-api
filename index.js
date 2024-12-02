import express from 'express';
const app = express();

app.get('/', function (req,res){
  res.send('Walletwise Api')
})

app.listen(8080, function(){
  console.log('Hello World');
});
