import { SasignadosComponent } from './../sasignados/sasignados.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-select-colaborator',
  templateUrl: './select-colaborator.component.html',
  styleUrls: ['./select-colaborator.component.scss']
})
export class SelectColaboratorComponent implements OnInit {

  selectChange: FormGroup;
  colaboradorSelectted:any;
  listColaborator: any;
  iColaborator: number;
  item:any;
  submitted: boolean;
  
  constructor(private formBuilder: FormBuilder,private _router: Router,
    public dialogRef: MatDialogRef<SelectColaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public componentAsignados: SasignadosComponent) {

  }

  get f() { return this.selectChange.controls; }

  ngOnInit() {
    this.selectChange = this.formBuilder.group({
      selection: ['', [Validators.required]]
    });
    this.loadInfo();
  }

  loadInfo() {
  this.listColaborator =   this.componentAsignados.listSelect ;
  }

  changeColaborator(){
    this.submitted = true;
    if (this.selectChange.invalid) {
      return;
    }
console.log("active el boton")
  }

  insert(){
    this._router.navigate([`/colaboradores`]);
    this.dialogRef.close();
  }

}
