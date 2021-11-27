import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddClassroomComponent } from "./components/add-classroom/add-classroom.component";
import { HomeComponent } from "./components/home/home.component";
import { StudentGradesComponent } from "./components/students/student-grades/student-grades.component";
import { StudentNewsComponent } from "./components/students/student-news/student-news.component";
import { StudentsComponent } from "./components/students/student-news/students/students.component";
import { TeachersComponent } from "./components/teachers/teachers.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "news", component: StudentNewsComponent },
  { path: "elevi", component: StudentsComponent },
  { path: "classrooms", component: AddClassroomComponent },
  { path: "profesori", component: TeachersComponent },
  { path: "note", component: StudentGradesComponent },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
