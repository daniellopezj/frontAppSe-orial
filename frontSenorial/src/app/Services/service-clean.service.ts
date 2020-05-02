import { environment } from './../../environments/environment';
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
    return this.http.get<StatusServices>(`${environment.URL_SERVER}/Countpendientes/`);
  }

  public requestServicePending(): Observable<StatusServices> {
    return this.http.get<StatusServices>(`${environment.URL_SERVER}/pendientes/`);
  }

  public requestServiceFinish(): Observable<StatusServices> {
    return this.http.get<StatusServices>(`${environment.URL_SERVER}/realizados/`);
  }


  public requestServiceAssigned(): Observable<StatusServices> {
    return this.http.get<StatusServices>(`${environment.URL_SERVER}/asignados/`);
  }

  public UpdateService(object: Object): Observable<JSON> {
    return this.http.put<JSON>(`${environment.URL_SERVER}/actualizarServicio`, object);
  }
}
