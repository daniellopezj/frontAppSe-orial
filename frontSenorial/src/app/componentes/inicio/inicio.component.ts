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
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  mySelections: string[];
  formAssigned: FormGroup;
  submitted: boolean[] = Array();
  valueAsigned: Object[] = Array();

  constructor(private websocket: WebsocketService, private formBuilder: FormBuilder, private servicePerson: ServicePerson, private serviceClean: ServiceCleanService) {
    this.loadServicePending();
  }

  ngOnInit() {
    this.websocket.listen('showInfoPending').subscribe((data) => {
      this.listInfo = data;
      console.log("showInfoPending")
      this.createFormArray();
    })
    this.servicePerson.requestPerson().subscribe(res => {
      if (res.responseCode == 200) {
        this.listColaboradores = res.object;
      }
    });
    this.formAssigned = this.formBuilder.group({
      selectArrayColaborators: this.formBuilder.array(
        [this.createEmpFormGroup()],
        [Validators.required])
    });
  }

  get f() { return this.formAssigned.controls; }

  get selectArrayColaborators(): FormArray {
    return this.formAssigned.get('selectArrayColaborators') as FormArray;
  }

  createEmpFormGroup() {
    return this.formBuilder.group({
      selectionColaborators: ['', [Validators.required]],
    })
  }

  loadServicePending() {
    this.showinfo = false;
    this.serviceClean.requestServicePending().subscribe(res => {
      if (res.responseCode == 200) {
        this.showinfo = true;
        this.listInfo = res.object;
        this.createFormArray();
      } else {
        this.showinfo = true;
        console.log("ocurrio un fallo")
      }
    });
  }

  createFormArray() {
    while (this.selectArrayColaborators.length !== 0) {
      this.selectArrayColaborators.removeAt(0)
    }
    for (let entry of this.listInfo) {
      entry.asignados = new Array();
      this.addFormControl();
    }
  }

  changed(nColaboradores, id) {
    console.log(this.selectArrayColaborators.controls[id].get('selectionColaborators').value)
    if (this.selectArrayColaborators.controls[id].get('selectionColaborators').value.length <= nColaboradores) {
      this.mySelections = this.selectArrayColaborators.controls[id].get('selectionColaborators').value;
    } else {
      this.selectArrayColaborators.controls[id].get('selectionColaborators').setValue(this.mySelections);
    }
  }

  addFormControl() {
    let fg = this.createEmpFormGroup();
    this.selectArrayColaborators.push(fg);
    this.submitted.push(false)
  }

  asigned(item, id: number) {
    this.submitted[id] = true;
    if (this.selectArrayColaborators.controls[id].get('selectionColaborators').value == "") {
      return;
    }
    let value = this.selectArrayColaborators.controls[id].get('selectionColaborators').value
    if (this.valueAsigned[0] !== undefined) {
      item.asignados[0] = value
      this.valueAsigned[0] = undefined;
    } else {
      if(value instanceof Array){
        item.asignados = value
        console.log(item.asignados)
      }else{
        item.asignados[0] = value
        console.log(item.asignados)
      }
     
    }
    item.estado = "asignado";
    this.updateStatusService(item,id);
  }

  updateStatusService(item,id) {
    this.serviceClean.UpdateService(item).subscribe(res => {
      if (res['status'] == 200) {
        alert("solicitud aceptada")
        const index = this.listInfo.indexOf(item, 0);
        if (index > -1) {
          this.listInfo.splice(index, 1);
        }
        this.selectArrayColaborators.removeAt(id)
      } else {
        alert("Ocurrio un error")
      }
    })
  }

  refuse(item, id) {
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
          this.selectArrayColaborators.removeAt(id)
        } else {
          alert("Ocurrio un error")
        }
      })
    }
  }
}
