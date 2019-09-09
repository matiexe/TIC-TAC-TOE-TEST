const Game = require('./models/game');
class Player{
    constructor(isBot,symbol){
        this.isBot = isBot;
        this.symbol = symbol; 
        this.jugadas = [];
        this.jugadasDone = 0;
    }
}
const winnerPosition = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]
let currentPlayer = 1;
const humanPlayer = new Player(false,'X');
const botPlayer = new Player(true,'O');
const game = {
    tablero:[" "," "," "," "," "," "," "," "," "],
    players:[humanPlayer,botPlayer],
    winner:{ msg:'no hay ganador',check: false }
}
const tablero = {
    posicion: null,
    valor: " "
}
const crearJuego = ()=>{
    currentPlayer,
    game.players;
    return game 

}
const cambiarTurno = (currentPlayer) =>{
    if(currentPlayer === 1){
        currentPlayer = 2
    } else {
        currentPlayer = 1;
    }
    return currentPlayer;

}
const casillasDisponibles = () =>{
    let disponibles = 0;
    for(let i = 0 ;i<9;i++){
        if (game.tablero[i] ===" "){
            disponibles = disponibles+1;
        }
    }
    return disponibles;
}

const verificarGanador = () =>{
    if (currentPlayer === 1){
        for(let i = 0;i<winnerPosition.length;i++){
            if(
                humanPlayer.jugadas.indexOf(winnerPosition[i][0])>=0&&
                humanPlayer.jugadas.indexOf(winnerPosition[i][1])>=0&&
                humanPlayer.jugadas.indexOf(winnerPosition[i][2])>=0
              ){
                 return true;
              }
        }}else{
            for(let i = 0;i< winnerPosition.length;i++){
                if(
                    botPlayer.jugadas.indexOf(winnerPosition[i][0])>=0&&
                    botPlayer.jugadas.indexOf(winnerPosition[i][1])>=0&&
                    botPlayer.jugadas.indexOf(winnerPosition[i][2])>=0
                  ){
                      return  true;
                  }
        }

    }
}
const jugadaValida =(posicion)=>{
    if(game.tablero[posicion]!==" "){
        return false;
    }
    return true;
}
const set = (id,players)=>{
    //game.id= id
}
const jugada = (posicion, ficha) =>{
    if(casillasDisponibles()>=1){
        if(currentPlayer === 1){
            posicion = Number(posicion)
            humanPlayer.jugadas.push(posicion+1);
            humanPlayer.jugadasDone = humanPlayer.jugadasDone+1;
            game.tablero[posicion]=ficha;
            if(humanPlayer.jugadas.length>2){
                if(verificarGanador(currentPlayer)){

                    game.winner = {msg:"El humano ha ganado",check:true};
                    return game;
                    
                }
                
            }
                console.log(currentPlayer ,humanPlayer.jugadas,game.tablero,verificarGanador(currentPlayer));
                currentPlayer = cambiarTurno(currentPlayer);
                return game
        } else {
            pos= Math.floor(Math.random()*8);
            while(jugadaValida(pos)==false){
                pos = Math.floor(Math.random()*8);
                jugadaValida(pos);
            }
                botPlayer.jugadas.push(pos+1);  
                botPlayer.jugadasDone= botPlayer.jugadasDone+1;
                game.tablero[pos]='O';
            
            }
              
            if(botPlayer.jugadasDone.length>=3){
                if(verificarGanador(currentPlayer)){
                    game.winner.check = true;
                    game.winner.msg="La computadora ha ganado"
                    "";
                    return game;
                }
            }
            console.log(currentPlayer,botPlayer.jugadas , casillasDisponibles()) ;
            currentPlayer = cambiarTurno(currentPlayer);
            return game;
    } else {
        game.winner.msg = 'JUEGO EMPATADO';
        game.winner.check = false;
        return game;
    }
    
}

module.exports = {
    crearJuego,
    jugada,
    set
}