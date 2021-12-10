import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { AddClassroomComponent } from "./components/add-classroom/add-classroom.component";
import { HomeComponent } from "./components/home/home.component";
import { StudentGradesComponent } from "./components/students/student-grades/student-grades.component";
import { StudentNewsComponent } from "./components/students/student-news/student-news.component";
import { StudentsComponent } from "./components/students/students/students.component";
import { TeachersComponent } from "./components/teachers/teachers.component";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "news", component: StudentNewsComponent },
  { path: "elevi", component: StudentsComponent, canActivate: [AuthGuard] },
  {
    path: "classrooms",
    component: AddClassroomComponent,
    canActivate: [AuthGuard],
  },
  { path: "profesori", component: TeachersComponent, canActivate: [AuthGuard] },
  { path: "note", component: StudentGradesComponent, canActivate: [AuthGuard] },
  { path: "about-us", component: AboutComponent },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
