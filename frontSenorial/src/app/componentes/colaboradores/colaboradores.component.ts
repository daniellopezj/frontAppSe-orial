import { ServicePerson } from './../../Services/ServicePerson';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent implements OnInit {

  message: string = "Persons";
  showinfo: boolean;
  listInfo: any;
  headElements = [ 'Nombre', 'Apellido', 'Celular', 'eliminar', 'actualizar'];
  name: number;
  sendperson: Person;

  constructor(public dialog: MatDialog, private _router: Router, private servicePerson: ServicePerson) {
    this.showinfo = false;
    this.loadPersons();
  }

  insert(): void {
   /* const dialogRef = this.dialog.open(InsertUpdatePersonComponent, {
      data: { name: 1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.NewsServices.requestPerson().subscribe(res => {
        this.listInfo = res;
      });
    });*/
  }

  loadPersons() {
    this.showinfo = false;
    this.servicePerson.requestPerson().subscribe(res => {
      if(res.responseCode == 200){
        this.listInfo = res.object;
      this.showinfo = true;
      }else{
        console.log("ocurrio un fallo")
      }
    });
  }


  ngOnInit() {
    this.loadPersons();
  }

 delete(id_person) {
  /*   var opcion = confirm("¿Estas seguro(@)?");
    if (opcion == true) {
      this.NewsServices.deletePerson(id_person).subscribe(res => {
        if (res['status'] == 200) {
          this.NewsServices.requestPerson().subscribe(res => {
            this.listInfo = res;
          });
          console.log("hola");
        } else {
          alert("Ocurrio un error")
        }
      })
    }*/
  }

  update(valor) {
   /* const dialogRef = this.dialog.open(InsertUpdatePersonComponent, {
      data: { name: 2, sendperson: valor }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.NewsServices.requestPerson().subscribe(res => {
        this.listInfo = res;
      });
    });
  }*/
}



}
