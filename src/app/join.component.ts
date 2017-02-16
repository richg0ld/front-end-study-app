import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {SocketService} from "./socket.service";
import {StudentService} from "./student.service";
import {TeacherService} from "./teacher.service";

@Component({
    selector: 'study-join',
    templateUrl: 'join.component.html',
    styleUrls: ['join.component.css']
})
export class JoinComponent implements OnInit {

  ip: string;

  constructor(
    private router: Router,
    private socketService: SocketService,
    private studentService: StudentService,
    private teacherService: TeacherService){  }

  ngOnInit(): void{
    this.teacherService.getIp().then(ip => this.ip = ip);
  }

  add(name: string): void {
    name = name.trim();
    if(!name || !this.ip) { return; }
    if(name === 'admin'){
      this.teacherService.create(name, this.ip).then(() => location.reload() );
      return;
    }
    this.studentService.create(name, this.ip)
    .then(data =>{
      this.socketService.joinStudy(data.name);
      this.router.navigate(['/detail', data.id]);
    });
  }
}
