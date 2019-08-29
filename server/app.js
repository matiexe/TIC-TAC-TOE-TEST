const express = require('express');
const bodyParser = require('body-parser');
const apiGame = require('./api/game');
const bot = require('./api/bot');
const store = require('./api/store');
const app = express();
//config
app.set('port',(process.env.PORT||3000))

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
// Crea un juego nuevo
app.post ('/api/game',(req,res)=>{
    const game = apiGame.crearJuego();
    store.crear(game);
    res.status(201).json(game);
    
})
// Consulta un juego con su id
app.get('/api/game/:id',(req, res)=>{
    const game = apiGame.crearJuego();
    res.status(201).json(game);
    
});
//inserta un movimiento en un juego creado
app.post ('/api/game/:id',async (req,res)=>{
    pos = req.body.pos;
    ficha = req.body.ficha;
    const movimiento = await apiGame.movimiento(pos,ficha);
    res.status(201).json(movimiento);
})

//server
app.listen(app.get('port'),()=>{
    console.log(`Listen port ${app.get('port')}`);
})
