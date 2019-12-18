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
  //submitted = false;

  constructor(private websocket: WebsocketService, private formBuilder: FormBuilder, private servicePerson: ServicePerson, private serviceClean: ServiceCleanService) {
    this.loadServicePending();
  }

  ngOnInit() {
    this.websocket.listen('test-event').subscribe((data) => {
      console.log(data);
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
      selectionOneCollaborator: ['', [Validators.required]],
      selectionManyCollaborator: ['', [Validators.required]],
      selectionVehicle: ['', [Validators.required]],
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
        for (let entry of this.listInfo) {
          this.addFormControl();
        }
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

  addFormControl() {
    let fg = this.createEmpFormGroup();
    this.selectArray.push(fg);
    this.submitted.push(false)
  }

  asigned(id: number) {
    console.log("hola")
    this.submitted[id] = true;
    if (this.selectArray[id].invalid) {
      return;
    }
    alert(id);
  }
}
