const express = require('express');
const app = express();
//config
app.set('port',(process.env.PORT||3000))

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.get('/',(req, res)=>{
    res.json({title :'hello world'});
})

//server
app.listen(app.get('port'),()=>{
    console.log(`Listen port ${app.get('port')}`);
})
