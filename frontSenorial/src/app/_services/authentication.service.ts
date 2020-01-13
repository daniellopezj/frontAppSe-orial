import { Admin } from './../models/Admin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatusServices } from '../Services/StatusServices';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentAdminSubject: BehaviorSubject<any>;
    public currentAdmin: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentAdmin')));
        this.currentAdmin = this.currentAdminSubject.asObservable();
    }

    public get currentAdminValue(): any {
        return this.currentAdminSubject.value;
    }

    public loginAdmin(admin: Object): Observable<StatusServices> {
        return this.http.post<StatusServices>(`http://localhost:3000/loginAdmin`, admin)
    }

    changecCurrentAdmin(any: any) {
        localStorage.setItem('currentAdmin', JSON.stringify(any));
        this.currentAdminSubject.next(any);
    }
  
    logout() {
        // remove Admin from local storage to log Admin out
        localStorage.removeItem('currentAdmin');
        this.currentAdminSubject.next(null);
    }
}