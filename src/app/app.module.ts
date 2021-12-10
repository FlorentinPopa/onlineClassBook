import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { StudentNewsComponent } from "./components/students/student-news/student-news.component";
import { HttpClientModule } from "@angular/common/http";
import { StudentsComponent } from "./components/students/students/students.component";
import { AddClassroomComponent } from "./components/add-classroom/add-classroom.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { TeachersComponent } from "./components/teachers/teachers.component";
import { StudentDetailsComponent } from "./components/students/student-details/student-details.component";
import { MatDialogModule } from "@angular/material/dialog";
import { TeacherDetailsComponent } from "./components/teachers/teacher-details/teacher-details.component";
import { GradeComponent } from "./components/grade/grade.component";
import { StudentGradesComponent } from "./components/students/student-grades/student-grades.component";
import { AddStudentComponent } from "./components/students/add-student/add-student.component";
import { AddTeacherComponent } from "./components/teachers/add-teacher/add-teacher.component";
import { AboutComponent } from "./components/about/about.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StudentNewsComponent,
    StudentsComponent,
    AddClassroomComponent,
    TeachersComponent,
    StudentDetailsComponent,
    TeacherDetailsComponent,
    GradeComponent,
    StudentGradesComponent,
    AddStudentComponent,
    AddTeacherComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
