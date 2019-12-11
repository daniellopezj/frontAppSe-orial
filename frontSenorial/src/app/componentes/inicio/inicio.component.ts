import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/Services/websocket.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  ngOnInit() {
    this.websocket.listen('test-event').subscribe((data) => {
      console.log(data);
    })
  }

}
