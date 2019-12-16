import { ServiceCleanService } from './../../Services/service-clean.service';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/Services/websocket.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  showinfo: boolean;
  listInfo: any;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private websocket: WebsocketService, private serviceClean:ServiceCleanService) {
    this.loadServicePending();
   }

  ngOnInit() {
    this.websocket.listen('test-event').subscribe((data) => {
      console.log(data);
    })
  }


  loadServicePending() {
    this.showinfo = false;
    this.serviceClean.requestServicePending().subscribe(res => {
      if (res.responseCode == 200) {
        this.listInfo = res.object;
        this.showinfo = true;
      } else {
        console.log("ocurrio un fallo")
      }
    });
  }


}
