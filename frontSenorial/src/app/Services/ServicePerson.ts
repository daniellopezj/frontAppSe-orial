import { environment } from './../../environments/environment';
import { StatusServices } from './StatusServices';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/Person';
@Injectable({
    providedIn: 'root'
})

export class ServicePerson {
    constructor(private http: HttpClient) { }
    public requestPerson(): Observable<StatusServices> {
        return this.http.get<StatusServices>(`${environment.URL_SERVER}/person/`);
    }

    public insertPerson(person: Person): Observable<JSON> {
        return this.http.post<JSON>(`${environment.URL_SERVER}/person`, person);
    }

    public UpdatePerson(person: Person): Observable<JSON> {
        return this.http.put<JSON>(`${environment.URL_SERVER}/person`, person);
    }
    
    public deletePerson(id_person: number): Observable<JSON> {
        return this.http.delete<JSON>(`${environment.URL_SERVER}/person/`+id_person );
    }
}