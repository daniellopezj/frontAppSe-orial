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
        return this.http.get<StatusServices>(`http://localhost:3000/person/`);
    }

    public insertPerson(person: Person): Observable<JSON> {
        return this.http.post<JSON>(`http://localhost:3000/person`, person);
    }

    public UpdatePerson(person: Person): Observable<JSON> {
        return this.http.put<JSON>(`http://localhost:3000/person`, person);
    }
    
    public deletePerson(id_person: number): Observable<JSON> {
        return this.http.delete<JSON>(`http://localhost:3000/person/`+id_person );
    }
}