import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { StudentSearchService } from './student-search.service';
import { Student } from './student';

@Component({
  moduleId: module.id,
  selector: 'student-search',
  templateUrl: 'student-search.component.html',
  styleUrls: [ 'student-search.component.css' ],
  providers: [StudentSearchService]
})

export class StudentSearchComponent implements OnInit {

  students: Observable<Student[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private studentSearchService: StudentSearchService,
    private router: Router) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.students = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.studentSearchService.search(term)
        : Observable.of<Student[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Student[]>([]);
      });
  }

  gotoDetail(student: Student): void {
    let link = ['/detail', student.id];
    this.router.navigate(link);
  }
}
