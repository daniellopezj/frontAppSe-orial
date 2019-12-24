import { ServicePerson } from './../../Services/ServicePerson';
import { SelectColaboratorComponent } from './../select-colaborator/select-colaborator.component';
import { ServiceCleanService } from './../../Services/service-clean.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sasignados',
  templateUrl: './sasignados.component.html',
  styleUrls: ['./sasignados.component.scss']
})
export class SasignadosComponent implements OnInit {
  showinfo: boolean;
  listInfo: any;
  headElements = ['Nombre', 'Apellido', 'Celular', 'Asignados'];
  listColaborator: any;
  iColaborator: number;
  item:any;
  listSelect:any;
  constructor(public dialog: MatDialog, private servicePerson: ServicePerson, private cleanService: ServiceCleanService) { }

  ngOnInit() {
    this.servicePerson.requestPerson().subscribe(res => {
      if (res.responseCode == 200) {
        this.listColaborator = res.object;

      }
    });
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

  async changeColaborator(item, colaborators, iColaborator) {
    let newArray = new Array();
    let listColaboratorId = new Array();
    for (let entry of colaborators) {
      listColaboratorId.push(entry.id_person);
    }
    this.listColaborator.filter(function (x) {
      if (!listColaboratorId.includes(x.id_person)) {
        newArray.push(x);
      }
    });
    this.closeAndOpenDialog(item, newArray, iColaborator)
  }

  closeAndOpenDialog(item, newArray, iColaborator){
    const dialogRef = this.dialog.open(SelectColaboratorComponent, {
      width: '350px',
      data: { item: item, listSelect: newArray,iColaborator:iColaborator  }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("close dialog")
    });
  }
}
