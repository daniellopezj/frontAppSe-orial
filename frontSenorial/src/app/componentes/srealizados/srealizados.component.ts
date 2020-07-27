import { WebsocketService } from 'src/app/Services/websocket.service';
import { ServiceCleanService } from './../../Services/service-clean.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-srealizados',
  templateUrl: './srealizados.component.html',
  styleUrls: ['./srealizados.component.scss']
})
export class SrealizadosComponent implements OnInit {

  listInfo: any;
  showinfo: boolean;
  show: boolean[] = Array() ;
  headElements = ['Nombre', 'Apellido', 'Celular'];
  constructor(private webSocket:WebsocketService,private serviceCleanService: ServiceCleanService) {

  }

  ngOnInit() {
    this.webSocket.listen('finish').subscribe((data) => {
      console.log("entro al socket")
      this.loadInfo();
    })
    if (localStorage.getItem("listTerminados")) {
      this.listInfo = JSON.parse(localStorage.getItem("listTerminados"));
      this.showinfo = true;
    } else {
      this.loadInfo();
    }

  }

  setlistStorage(){
    localStorage.setItem("listTerminados", JSON.stringify(this.listInfo));
  }

  loadInfo(){
    this.serviceCleanService.requestServiceFinish().subscribe(res => {
      if (res.responseCode == 200) {
        this.listInfo = res.object;
        this.setlistStorage();
      } else {
        alert("Ocurrio un problema!")
      }
      this.showinfo = true;
    })
  }
}
