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
  constructor(private serviceCleanService: ServiceCleanService) {

  }

  ngOnInit() {
  this.loadInfo();
  }

  loadInfo(){
    this.showinfo = false;
    this.serviceCleanService.requestServiceFinish().subscribe(res => {
      if (res.responseCode == 200) {
        this.listInfo = res.object;
      } else {
        alert("Ocurrio un problema!")
      }
      this.showinfo = true;
    })
  }
}
