import { AuthenticationService } from 'src/app/_services';
import { Admin } from './../../models/Admin';
import { NavApplicactionComponent } from './../nav-applicaction/nav-applicaction.component';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { MustMatch } from 'src/app/models/must-match.validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})

export class ChangePassComponent implements OnInit {
  changeForm: FormGroup;
  submitted = false;
  admin: Admin;
  newPassword: string;
  error = '';
  confirm: string
  object:Object;

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, public dialogRef: MatDialogRef<ChangePassComponent>,
    @Inject(MAT_DIALOG_DATA) public componentPerson: NavApplicactionComponent, private authService: AuthenticationService) {
    this.admin = new Admin();
    if (localStorage.getItem('currentAdmin')) {
      this.admin.user = JSON.parse(localStorage.getItem('currentAdmin'))[0].user;
    }
  }

  ngOnInit() {
    this.changeForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  get f() { return this.changeForm.controls; }


  changePass() {
    this.submitted = true;
    if (this.changeForm.invalid) {
      return;
    }
    this.authService.changePassword(
      {
        user: this.admin.user,
        password: this.admin.password,
        newpassword: this.newPassword
      }).subscribe(res => {
        if (res.responseCode == 200) {
          alert("Cambio realizado")
          this.dialogRef.close()
        } else {
          this.error = 'contraseña incorrecta';
          this.clear();
        }
      })

  }

  clear() {
    this.newPassword = '';
    this.admin.password = '';
    this.confirm = '';
    this.cdRef.detectChanges();
  }
}
