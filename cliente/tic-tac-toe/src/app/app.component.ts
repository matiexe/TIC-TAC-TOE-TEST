import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GameService} from './game.service';
import { setTimeout } from 'timers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameService]
})
export class AppComponent {
  title = 'tic-tac-toe';
  lock = false;
  id ;
  tablero;
  ficha = 'x';
  currentPlayer = 1;
  constructor(public gs: GameService, public snackBar: MatSnackBar) {
  }
  newGame() {
      this.gs.newGame()
      .subscribe(game => {
        console.log(game);
        this.id = game;
        console.log(this.id);
        });
      setTimeout(() => {
        this.getGame();
      }, 3000);

  }
  getGame() {
     this.gs.getGame(this.id)
     .subscribe(gameId => {
        console.log(gameId);
        this.tablero = gameId.tablero;
     });
  }
  playerMove(pos) {
    this.gs.playerMove( this.id, pos, this.ficha)
    .subscribe(move => {
      this.getGame();
    });
  }
  botMove() {
    this.gs.botMove( this.id)
    .subscribe(move => {
      this.getGame();
    });
  }
  gaming(pos) {
   {
      this.playerMove(pos);
      setTimeout(() => {
       this.botMove();
      }, 2000);

  }
}
  restartGame(event) {
    location.reload();
    event.preventDefault();
  }
}
