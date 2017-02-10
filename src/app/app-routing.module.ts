import {NgModule} from '@angular/core';
import {RouterModule, Routes}   from '@angular/router';

import {StudentDetailComponent} from './student-detail.component';
import {StudentsComponent} from './students.component';
import {DashboardComponent} from "./dashboard.component";
import {JoinComponent} from "./join.component";

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: StudentDetailComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'join', component: JoinComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
