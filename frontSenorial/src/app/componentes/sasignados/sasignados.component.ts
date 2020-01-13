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

  constructor(public dialog: MatDialog, private servicePerson: ServicePerson, private cleanService: ServiceCleanService) {
    this.loadServiceAssigned();
   }

  ngOnInit() {
    this.servicePerson.requestPerson().subscribe(res => {
      if (res.responseCode == 200) {
        this.listColaborator = res.object;
      }
    });
   
  }

  loadServiceAssigned() {
    this.showinfo = false;
    this.cleanService.requestServiceAssigned().subscribe(res => {
      console.log(res)
      if (res.responseCode == 200) {
        this.showinfo = true;
        this.listInfo = res.object;
      } else {
        this.showinfo = true;
        console.log("ocurrio un fallo")
      }
     
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

  finishService(item, id){
    item.estado = "terminado";
    this.cleanService.UpdateService(item).subscribe(res => {
      if (res['status'] == 200) {
        alert("Servicio terminado")
        const index = this.listInfo.indexOf(item, 0);
        if (index > -1) {
          this.listInfo.splice(index, 1);
        }
      } else {
        alert("Ocurrio un error")
      }
    })
  }
}
