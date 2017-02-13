import 'hammerjs';
import 'socket.io-client';
import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule }     from './app-routing.module';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentsComponent, DialogContent } from './students.component';
import { StudentSearchComponent } from "./student-search.component";
import { DashboardComponent } from "./dashboard.component";
import { MaterialTestComponent } from './material-test.component';
import {JoinComponent} from "./join.component";

import { SocketService } from './socket.service';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';


@NgModule({
  declarations: [
    AppComponent,
    StudentDetailComponent,
    StudentsComponent, DialogContent,
    DashboardComponent,
    StudentSearchComponent,
    MaterialTestComponent,
    JoinComponent
  ],
  entryComponents: [DialogContent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    MaterialModule.forRoot()
  ],
  providers: [SocketService, StudentService, TeacherService],
  bootstrap: [AppComponent]
})

export class AppModule { }
