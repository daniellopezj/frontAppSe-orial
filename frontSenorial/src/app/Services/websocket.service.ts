import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private url = environment.URL_SERVER;

  private socket: any;

  constructor() {
    this.socket = io(this.url);
    console.log(this.url)
  }

  listen(eventName: String) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      })
    });
  }

  emit(eventName: String, data: any) {
    this.socket.emit(eventName, data);
  }

}