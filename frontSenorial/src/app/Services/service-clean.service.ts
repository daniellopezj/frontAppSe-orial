import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusServices } from './StatusServices';

@Injectable({
  providedIn: 'root'
})
export class ServiceCleanService {

  constructor(private http: HttpClient) { }
    public requestPerson(): Observable<StatusServices> {
        return this.http.get<StatusServices>(`http://localhost:3000/person/`);
    }

    /*public insertPerson(person: Person): Observable<JSON> {
        return this.http.post<JSON>(`http://localhost:3000/person`, person);
    }*/
}
