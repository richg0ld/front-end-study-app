import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import {SERVER_URL} from "./app.globals";

@Injectable()
export class SocketService {

  private url = SERVER_URL;
  private socket: SocketIOClient.Socket;

  joinStudy(str: string){
    this.socket.emit('join study', str);
  }

  updateStudentStatus(){
    this.socket.emit('update studentStatus');
  }

  getPush(){
    this.socket = io.connect(SERVER_URL);
    return new Observable(observer => {
      this.socket = io.connect(this.url);
      this.socket.on('join study',str => observer.next(str) );
      return () => this.socket.disconnect();
    });
  }

  updateStudents(){
    return new Observable(observer => {
      this.socket.on('update studentStatus',() => observer.next() );
      this.socket.on('join study',() => observer.next() );
      return () => this.socket.disconnect();
    });
  }
}
