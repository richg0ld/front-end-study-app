import {Component, OnInit, Optional} from '@angular/core';
import {Router} from "@angular/router";
import {MdDialog, MdDialogRef} from '@angular/material';
import {StudentService} from "./student.service";
import {Student} from "./student";

@Component({
  moduleId: module.id,
  selector: 'my-students',
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  selectedStudent: Student;
  lastDialogResult: string;

  constructor(
    private mdDialog: MdDialog,
    private router: Router,
    private studentService: StudentService) { }

  getStudents(): void {
    this.studentService.getStudents().then(students => this.students = students);
  }

  ngOnInit(): void {
    this.getStudents();
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;

    let dialogRef = this.mdDialog.open(DialogContent);

    dialogRef.componentInstance.id = student.id;
    dialogRef.componentInstance.name = student.name;

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedStudent.id]);
  }

  delete(student: Student): void {
    this.studentService
    .delete(student.id)
    .then(() => {
      this.students = this.students.filter(h => h !== student);
      if (this.selectedStudent === student) { this.selectedStudent = null; }
    });
  }
}

@Component({
  template: `
    <div>
      <h2>
        {{name | uppercase}} is my student
      </h2>
      <button md-button (click)="gotoDetail()">View Details</button>
    </div>
  `,
})
export class DialogContent {

  id: number;
  name: string;

  constructor(private router: Router,
    @Optional() public dialogRef: MdDialogRef<DialogContent>) { }

  gotoDetail(): void {
    this.dialogRef.close();
    this.router.navigate(['/detail', this.id]);
  }
}
