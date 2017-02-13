import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {SocketService} from "./socket.service";
import {StudentService} from "./student.service";
import {TeacherService} from './teacher.service';

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
    private router: Router){  }

  ngOnInit(): void{
    this.teacherService.getIp().then(ip=>{
      this.teacherService.getTeacher().then(teacher=> {
        this.computerIp = ip;
        console.log(this.computerIp);
        this.areYouTeacher = teacher.ip === ip;
        if(this.areYouTeacher){ return this.router.navigate(['/dashboard']); }
        this.studentService.getStudents().then(students=>{
          students.forEach(student=>{
            student.ip === ip ? this.router.navigate(['/detail', student.id]) : this.router.navigate(['/join']);
          });
        });
      });
    });

    // this.socketService.getTest();
  }

}


