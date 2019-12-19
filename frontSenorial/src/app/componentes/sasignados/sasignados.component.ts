import { ServiceCleanService } from './../../Services/service-clean.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sasignados',
  templateUrl: './sasignados.component.html',
  styleUrls: ['./sasignados.component.scss']
})
export class SasignadosComponent implements OnInit {
  showinfo: boolean;
  listInfo: any;
  constructor(private cleanService: ServiceCleanService) { }

  ngOnInit() {
    this.loadServiceAssigned();
  }


  loadServiceAssigned() {
    this.showinfo = false;
    this.cleanService.requestServiceAssigned().subscribe(res => {
      if (res.responseCode == 200) {
        this.listInfo = res.object;
      } else {
        console.log("ocurrio un fallo")
      } 
      this.showinfo = true;
    });
  }
}
