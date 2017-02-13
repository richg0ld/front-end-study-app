import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {

  private url = 'http://127.0.0.1:3000';
  private socket: SocketIOClient.Socket;

  sendTest(str: string){
    this.socket.emit('send string', str);
  }

  getTest(){
    io.connect(this.url);
    this.socket.on('send string',function(str){
      console.log('send string : ', str)
    });
  }
}
