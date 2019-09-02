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
//Obtiene los juegos jugados creados
app.get('/api/game/s',(req,res)=>{
    Game.find((err,gameBD)=>{
        if(err){
            ok:false,
            err
        }
        return res.status(201).json(gameBD);
    })
    
})
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
    let players
    Game.findById(req.params.id,(err,gameBD)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }  players = gameBD; 
    })
    set = apiGame.set(req.params.id,players);
    const movimiento = apiGame.jugada(pos,ficha);
    const dataRefresh ={
        id:movimiento.id,
        tablero:movimiento.tablero,
        players:players,
        winner :movimiento.winner
    }
    console.log(dataRefresh,movimiento);
    Game.findByIdAndUpdate(req.params.id,{tablero:movimiento},(err,gameBD)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(201).json(gameBD);
    })
    
})

//server
app.listen(app.get('port'),()=>{
    console.log(`Listen port ${app.get('port')}`);
})
