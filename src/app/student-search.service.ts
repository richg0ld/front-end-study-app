import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable()
export class StudentSearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<Student[]> {
    return this.http
      .get(`app/students/?name=${term}`)
      .map((r: Response) => r.json().data as Student[]);
  }
}
