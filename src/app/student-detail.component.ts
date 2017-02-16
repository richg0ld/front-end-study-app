import 'rxjs/add/operator/switchMap';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {SocketService} from "./socket.service";
import {StudentService} from './student.service';

import {Student} from './student';
import {areYouTeacher} from "./app.globals";

@Component({
  moduleId: module.id,
  selector: 'my-student-detail',
  templateUrl: 'student-detail.component.html',
  styleUrls: ['student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  student: Student;
  areYouTeacher: boolean;

  constructor(
    private socketService: SocketService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void{
    this.route.params
      .switchMap((params: Params) => this.studentService.getStudent(+params['id']))
      .subscribe(student => this.student = student);
    this.areYouTeacher = areYouTeacher;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.studentService.update(this.student).then(()=> this.socketService.updateStudentStatus());
    // .then(() => this.router.navigate(['/students']));
  }
}
