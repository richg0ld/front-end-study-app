import {Component, OnInit} from '@angular/core';

import { Student } from './student';
import { StudentService } from './student.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService){ }

  ngOnInit(): void {
    this.studentService.getStudents().then(students => {
      this.students = students.filter(student=> student.rank).slice(0, 3);
      console.log(this.students);
    });
  }
}
