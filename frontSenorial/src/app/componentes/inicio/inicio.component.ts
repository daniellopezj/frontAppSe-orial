import { ServicePerson } from './../../Services/ServicePerson';
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
  listColaboradores: any;
  mascolaboradores = new FormControl();
  multipleCol: String;
  selected = '';
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  mySelections: string[];

  constructor(private websocket: WebsocketService, private servicePerson: ServicePerson, private serviceClean: ServiceCleanService) {
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
        this.servicePerson.requestPerson().subscribe(res => {
          if (res.responseCode == 200) {
            this.listColaboradores = res.object;
            this.showinfo = true;
          }
        });
            this.listInfo = res.object;
      } else {
        console.log("ocurrio un fallo")
      }
    });
  }

  changed(nColaboradores) {
    if (this.mascolaboradores.value.length <= nColaboradores) {
      this.mySelections = this.mascolaboradores.value;
    } else {
      this.mascolaboradores.setValue(this.mySelections);
    }
  }

}
