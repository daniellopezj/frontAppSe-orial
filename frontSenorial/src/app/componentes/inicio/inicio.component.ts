import { ServicePerson } from './../../Services/ServicePerson';
import { ServiceCleanService } from './../../Services/service-clean.service';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/Services/websocket.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  formAssigned: FormGroup;
  submitted: boolean[] = Array();

  constructor(private websocket: WebsocketService, private formBuilder: FormBuilder, private servicePerson: ServicePerson, private serviceClean: ServiceCleanService) {
    this.loadServicePending();
  }

  ngOnInit() {
    this.websocket.listen('showInfoPending').subscribe((data) => {
      this.listInfo = data;
      this.createFormArray();
    })
    this.formAssigned = this.formBuilder.group({
      selectArray: this.formBuilder.array(
        [this.createEmpFormGroup()],
        [Validators.required])
    });
  }

  get f() { return this.formAssigned.controls; }

  get selectArray(): FormArray {
    return this.formAssigned.get('selectArray') as FormArray;
  }

  createEmpFormGroup() {
    return this.formBuilder.group({
      selection: ['', [Validators.required]],
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
        this.createFormArray();
      } else {
        this.showinfo = true;
        console.log("ocurrio un fallo")
      }
    });
  }

  createFormArray(){
    while (this.selectArray.length !== 0) {
      this.selectArray.removeAt(0)
    }
    for (let entry of this.listInfo) {
      this.addFormControl();
    }
  }

  changed(nColaboradores, id) {
    if (this.selectArray.controls[id].get('selection').value.length <= nColaboradores) {
      this.mySelections = this.selectArray.controls[id].get('selection').value;
    } else {
      this.selectArray.controls[id].get('selection').setValue(this.mySelections);
    }
  }

  addFormControl() {
    let fg = this.createEmpFormGroup();
    this.selectArray.push(fg);
    this.submitted.push(false)
  }

  asigned(item, id: number) {
    this.submitted[id] = true;
    if (this.selectArray.controls[id].get('selection').value == "") {
      return;
    }
    item.asignados = this.selectArray.controls[id].get('selection').value
    item.estado = "asignado";
    this.serviceClean.UpdateService(item).subscribe(res => {
      if (res['status'] == 200) {
        alert("solicitud aceptada")
        const index = this.listInfo.indexOf(item, 0);
        if (index > -1) {
          this.listInfo.splice(index, 1);
        }
        this.selectArray.removeAt(id)
      } else {
        alert("Ocurrio un error")
      }
    })
  }

  refuse(item,id) {
    var opcion = confirm("¿Estas seguro de rechazar el servicio?");
    if (opcion == true) {
      item.estado = "rechazado";
      this.serviceClean.UpdateService(item).subscribe(res => {
        if (res['status'] == 200) {
          alert("solicitud rechazada")
          const index = this.listInfo.indexOf(item, 0);
          if (index > -1) {
            this.listInfo.splice(index, 1);
          } 
          this.selectArray.removeAt(id)
        } else {
          alert("Ocurrio un error")
        }
      })
    }
  }
}