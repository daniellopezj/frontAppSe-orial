import { ServicePerson } from "./../../Services/ServicePerson";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Person } from "src/app/models/Person";
import { IUPersonComponent } from "../iuperson/iuperson.component";

@Component({
  selector: "app-colaboradores",
  templateUrl: "./colaboradores.component.html",
  styleUrls: ["./colaboradores.component.scss"],
})
export class ColaboradoresComponent implements OnInit {
  message: string = "Persons";
  showinfo: boolean;
  listInfo: any;
  headElements = [
    "Nombre",
    "Apellido",
    "Cedula",
    "Celular",
    "eliminar",
    "actualizar",
  ];
  name: number;
  sendperson: Person;

  constructor(public dialog: MatDialog, private servicePerson: ServicePerson) {}

  ngOnInit() {
    this.showinfo = false;
    if (localStorage.getItem("listColaboradores")) {
      this.listInfo = JSON.parse(localStorage.getItem("listColaboradores"));
      this.showinfo = true;
    } else {
      this.loadPersons();
    }
  }

  insert(): void {
    const dialogRef = this.dialog.open(IUPersonComponent, {
      width: "500px",
      data: { name: 1 },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.servicePerson.requestPerson().subscribe((res) => {
        this.listInfo = res.object;
        this.setlistStorage();
      });
    });
  }

  setlistStorage() {
    localStorage.setItem("listColaboradores", JSON.stringify(this.listInfo));
  }

  loadPersons() {
    this.showinfo = false;
    this.servicePerson.requestPerson().subscribe((res) => {
      if (res.responseCode == 200) {
        this.listInfo = res.object;
        this.setlistStorage();
        this.showinfo = true;
      } else {
        console.log("ocurrio un fallo");
        this.showinfo = true;
      }
    });
  }

  delete(id_person) {
    var opcion = confirm("¿Estas seguro(@)?");
    if (opcion == true) {
      this.servicePerson.deletePerson(id_person).subscribe((res) => {
        if (res["status"] == 200) {
          this.servicePerson.requestPerson().subscribe(
            (res) => {
              this.listInfo = res.object;
              if (this.listInfo.length === 0) {
                console.log("es vacio ")
              }
              console.log(this.listInfo);
              this.setlistStorage();
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          alert("Ocurrio un error");
        }
      });
    }
  }

  update(valor) {
    const dialogRef = this.dialog.open(IUPersonComponent, {
      width: "500px",
      data: { name: 2, sendperson: valor },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.servicePerson.requestPerson().subscribe((res) => {
        this.listInfo = res.object;
        console.log(this.listInfo);
        this.setlistStorage();
      });
    });
  }
}
