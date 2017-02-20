import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Teacher } from './teacher';
import {SERVER_URL} from "./app.globals";

@Injectable()
export class TeacherService {

  private studentsUrl = `${SERVER_URL}/api/data`;
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
    // return this.http.get('//api.ipify.org?format=json')
    // .toPromise()
    // .then(response => response.json().ip)
    // .catch(this.handleError);

    const getUserIP = onNewIP => { //  onNewIp - your listener function for new IPs
      //compatibility for firefox and chrome
      const myPeerConnection = window.RTCPeerConnection;
      let pc = new myPeerConnection({
          iceServers: []
        }),
        noop = () => {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

      const iterateIP = ip => {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      };

      //create a bogus data channel
      pc.createDataChannel("");

      // create offer and set local description
      pc.createOffer().then(sdp => {
        sdp.sdp.split('\n').forEach(line => {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
      }).catch(reason => {
        // An error occurred, so handle the failure to connect
      });

      //listen for candidate events
      pc.onicecandidate = ice => {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    };

    return new Promise((resolve, reject)=>{
      getUserIP(ip=>resolve(ip));
    });
  }

  getTeacher(): Promise<Teacher>{
    const url = `${this.studentsUrl}/admin`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
