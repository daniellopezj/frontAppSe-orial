import { WebsocketService } from 'src/app/Services/websocket.service';
import { Admin } from './../../models/Admin';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../_services';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    data: Admin;
    error = '';
user:string;
password:string
    constructor(private formBuilder: FormBuilder, private websocket: WebsocketService, private route: ActivatedRoute, private router: Router,
        private authenticationService: AuthenticationService) {
        this.data = new Admin();
        if (this.authenticationService.currentAdminValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.data.password = this.password;
        this.data.user =  this.user;
        this.authenticationService.loginAdmin(this.data).subscribe(res => {
            if (res.responseCode == 200) {
                this.router.navigate(['/']);
                this.authenticationService.changecCurrentAdmin(res.object)
                this.loading = false;
            } else {
                localStorage.removeItem('currentAdmin');
                this.error = 'Usuario o Contraseña equivocados';
                this.loading = false;
            }
        },
        err => {
          console.log("Error occured" + err);
        }
      );
    }

    cleaninput() {
        this.password = "";
        this.user = "";
      }
}
