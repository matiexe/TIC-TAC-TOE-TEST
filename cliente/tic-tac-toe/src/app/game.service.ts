import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from './interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  domain: 'http://localhost:3000';


  constructor(private http: HttpClient ) {
   }
   newGame() {
    const path = `http://localhost:3000/api/game`;
    console.log(path);
    return this.http.post(path, '');
   }
   getAllGames() {
    const path = `${this.domain}/api/game/s`;
    return this.http.get<Game[]>(path);
   }
   getGame(id) {
    const path = `http://localhost:3000/api/game/${id}`;
    return this.http.get<Game>(path);
   }
   playerMove(id, pos, ficha) {
    const path = `http://localhost:3000/api/game/${id}`;
    return this.http.put(path, {pos, ficha});
   }
   botMove(id) {
    const path = `http://localhost:3000/api/game/${id}`;
    return this.http.put(path, '');
   }

}
