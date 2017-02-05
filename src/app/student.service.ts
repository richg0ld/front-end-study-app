import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Student } from './student';

@Injectable()
export class StudentService {

  private studentsUrl = 'api/students';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

  update(student: Student): Promise<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http
      .put(url, JSON.stringify(student), {headers: this.headers})
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  create(name: string): Promise<Student> {
    return this.http
      .post(this.studentsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res =>{
        console.log(res);
        return res.json().data;

      } )
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentsUrl)
      .toPromise()
      .then(response => response.json().data as Student[])
      .catch(this.handleError);
  }

  getStudent(id: number): Promise<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Student)
      .catch(this.handleError);
  }

  getStudentsSlowly(): Promise<Student[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getStudents()), 2000);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
