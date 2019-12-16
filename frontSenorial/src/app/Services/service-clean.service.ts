import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusServices } from './StatusServices';

@Injectable({
  providedIn: 'root'
})
export class ServiceCleanService {

  constructor(private http: HttpClient) { }
    public requestCountPending(): Observable<StatusServices> {
        return this.http.get<StatusServices>(`http://localhost:3000/Countpendientes/`);
    }

    public requestServicePending(): Observable<StatusServices> {
        return this.http.get<StatusServices>(`http://localhost:3000/pendientes/`);
    }
    
}
