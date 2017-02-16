import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';

import {SocketService} from "./socket.service";
import {StudentService} from "./student.service";
import {TeacherService} from './teacher.service';
import {checkTeacher, getMyIp} from "./app.globals";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Front end Study';
  areYouTeacher: boolean;
  computerIp: string; //test용

  constructor(
    private socketService: SocketService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router,
    private mdsnackBar: MdSnackBar){  }

  ngOnInit(): void{
    this.teacherService.getIp().then(ip=>{
      this.teacherService.getTeacher().then(teacher=> {
        this.computerIp = getMyIp(ip);
        this.areYouTeacher = checkTeacher(teacher.ip === ip);
        if(this.areYouTeacher){ return this.router.navigate(['/dashboard']); }
        this.studentService.getStudents()
          .then(students=> students.forEach(student=> student.ip === ip ? this.router.navigate(['/detail', student.id]) : this.router.navigate(['/join'])));
      });
    });

    this.socketService.getPush().subscribe(name => this.mdsnackBar.open(`${name}님이 접속 하셨습니다.`,'닫기'));
  }
}


