require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const apiGame = require('./api/game');
const Game = require('./api/models/game');
const mongoose = require('mongoose');
const app = express();
//config
app.set('port',(process.env.PORT||3000))

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//DataBase Connection
mongoose.connect(process.env.URLDB,{useNewUrlParser:true,useCreateIndex:true},(err,res)=>{
    if(err) throw err;
    console.log('bd conectada');
});
//routes
// Crea un juego nuevo
app.post ('/api/game',(req,res)=>{
    const game = apiGame.crearJuego();
    const nuevoJuego = new Game({
        tablero:game.tablero,
        players: game.players
    });
    nuevoJuego.save((err,nuevoJuegoBD)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.status(201).json(nuevoJuegoBD);
    })
})
// Consulta un juego con su id
app.get('/api/game/:id',(req, res)=>{
    Game.findById(req.params.id,(err,gameBD)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(201).json(gameBD);
    })
    
    
});
//inserta un movimiento en un juego creado
app.post ('/api/game/:id',(req,res)=>{
    pos = req.body.pos;
    ficha = req.body.ficha;
    const movimiento =  apiGame.jugada(pos,ficha);
    Game.findByIdAndUpdate(req.params.id,{tablero:movimiento},(err,gameBD)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(201).json(movimiento);
    })
    
})

//server
app.listen(app.get('port'),()=>{
    console.log(`Listen port ${app.get('port')}`);
})
