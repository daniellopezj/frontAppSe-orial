import { ServicePerson } from './../../Services/ServicePerson';
import { Person } from './../../models/Person';
import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColaboradoresComponent } from '../colaboradores/colaboradores.component';

@Component({
  selector: 'app-iuperson',
  templateUrl: './iuperson.component.html',
  styleUrls: ['./iuperson.component.scss']
})
export class IUPersonComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  person: Person;
  name: any;
  sendPerson: any;
  tittle: String;
  
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<IUPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public componentPerson: ColaboradoresComponent, private servicePerson: ServicePerson) {
    this.person = new Person();
    this.tittle = "";
  }
  
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      celular: ['', [Validators.required]],
    });
    this.loadinfo();
  }

  loadinfo() {
    if (this.componentPerson.name == 1) {
      this.tittle = "Registrar"
    } else if (this.componentPerson.name == 2) {
      this.tittle = "Actualizar"
      this.person = this.componentPerson.sendperson;
      console.log(this.person);
    }
  }

  insertOrUpdatePerson() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.componentPerson.name == 1) {
      this.insert();
    } else if (this.componentPerson.name == 2) {
      this.update();
    }
  }

  insert() {
    this.person.id_person = this.randomInt(10000, 20000);
    this.servicePerson.insertPerson(this.person).subscribe(res => {
      if (res['status'] == 200) {
        alert("datos almacenados")
        this.dialogRef.close();
      } else {
        alert("Ocurrio un error")
      }
    })
  }

  update() {
    this.servicePerson.UpdatePerson(this.person).subscribe(res => {
      if (res['status'] == 200) {
        alert("datos actualizados")
        this.dialogRef.close();
      } else {
        alert("Ocurrio un error")
      }
    })
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
