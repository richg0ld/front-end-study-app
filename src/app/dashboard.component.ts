import {Component, OnInit} from '@angular/core';

import {Student} from './student';
import {SocketService} from "./socket.service";
import {StudentService} from './student.service';

import {Subscription} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  connection: Subscription;
  students: Student[] = [];
  yet: number = 0;
  ing: number = 0;
  comp: number = 0;
  all: number = 0;

  constructor(
    private socketService: SocketService,
    private studentService: StudentService){ }

  ngOnInit(): void {
    this.update();
    this.connection = this.socketService.updateStudents().subscribe(()=>this.update());
  }

  update(){
    this.studentService.getStudents().then(students => {
      this.all = students.length;
      this.students = students.filter(student => student.rank).sort((a,b) => a.rank - b.rank).slice(0, 3);
      students.forEach(v=>{
        switch(v.complete){
          case 0: this.yet++;
            break;
          case 1: this.ing++;
            break;
          case 2: this.comp++;
            break;
          default: break;
        }
      });
    });
  }
}
