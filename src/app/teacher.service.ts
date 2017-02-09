import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Teacher } from './teacher';

@Injectable()
export class TeacherService {

  private studentsUrl = 'http://127.0.0.1:3000/api/data';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){  }

  create(name: string, ip: string): Promise<Teacher> {
    return this.http
      .post(this.studentsUrl, JSON.stringify({name: name, ip: ip}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() )
      .catch(this.handleError);
  }

  getIp(): Promise<string>{
    return this.http.get('//ipinfo.io/json')
    .toPromise()
    .then(response => response.json().ip);
  }

  getTeacher(): Promise<Teacher>{
    const url = `${this.studentsUrl}/admin`;
    return this.http.get(url)
      .toPromise()
      // .then(response => response.json())
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
