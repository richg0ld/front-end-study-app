import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router){  }

  ngOnInit(): void{
    this.teacherService.getIp().then(ip=>{
      this.teacherService.getTeacher().then(teacher=> {
        this.areYouTeacher = teacher.ip === ip;
        if(this.areYouTeacher){ return this.router.navigate(['/dashboard']); }
        this.studentService.getStudents().then(students=>{
          students.forEach(student=>{
            student.ip === ip ? this.router.navigate(['/detail', student.id]) : this.router.navigate(['/join']);
          });
        });
      });
    });
  }

}


