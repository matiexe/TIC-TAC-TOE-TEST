const uuid = require('uuid');
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
const currentPlayer = 1;
const humanPlayer = new Player(false,'X');
const botPlayer = new Player(true,'O');
const game = {
    id:null,
    tablero:[],
    players:[]
}
const tablero = {
    posicion: null,
    valor: " "
}
const crearJuego = ()=>{
    currentPlayer
    game.id = uuid.v4();
    for(let i = 1;i<=9;i++){
        game.tablero.push(" ");
    }
    game.players =[humanPlayer,botPlayer];
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
    for(let i = 0 ;i<9;i++){
        if (game.tablero[i] === ""){
            disponibles += disponibles;
        }
    }
    return disponibles;
}

const verificarGanador = (turno) =>{
    let winner = false;
    if (turno == 1){
        for(let i = 0;i< winnerPosition.length;i++){
            if(
                humanPlayer.jugadas.indexOf(winnerPosition[i][0])>=0&&
                humanPlayer.jugadas.indexOf(winnerPosition[i][0])>=0&&
                humanPlayer.jugadas.indexOf(winnerPosition[i][0])>=0
              ){
                  winner = true;
              }
        }}else{
            for(let i = 0;i< winnerPosition.length;i++){
                if(
                    botPlayer.jugadas.indexOf(winnerPosition[i][0])>=0&&
                    botPlayer.jugadas.indexOf(winnerPosition[i][0])>=0&&
                    botPlayer.jugadas.indexOf(winnerPosition[i][0])>=0
                  ){
                      winner = true;
                  }
        }
        return winner;

}
const jugada = (posicion, ficha) =>{
    if(casillasDisponibles>=1){
        if(turno === 1){
            humanPlayer.jugadas.push(posicion);
            humanPlayer.jugadasDone = humanPlayer.jugadasDone+1;
            game.tablero.push({posicion:ficha});
            cambiarTurno();
            if(humanPlayer.jugadasDone>=3){
                if(verificarGanador(1)){
                    return "El jugador 1 ha ganado";
                }
            }
        } else {
            posicion = Math.floor(Math.random()*casillasDisponibles);
            botPlayer.jugadas.push(posicion);
            botPlayer.jugadasDone= botPlayer.jugadas+1;
            game.tablero.push({posicion:'O'});
            cambiarTurno();
            if(botPlayer.jugadasDone>=3){
                if(verificarGanador(2)){
                    return "La computadora ha ganado";
                }
            }
        }
    } else {
        return 'JUEGO EMPATADO';
    }
    
}

module.exports = {
    crearJuego,
    jugada
}