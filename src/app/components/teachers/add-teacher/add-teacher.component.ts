import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ITeacher } from "src/app/interfaces/iteacher";
import { TeachersService } from "src/app/services/teachers.service";

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.component.html",
  styleUrls: ["./add-teacher.component.scss"],
})
export class AddTeacherComponent implements OnInit {
  constructor(
    private teacherService: TeachersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  teacherDetails: ITeacher = {
    name: "",
    email: "",
    password: "",
    materie: "",
  };

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["./"], { relativeTo: this.route });
  }

  addTeacher() {
    if (
      this.teacherDetails.name === "" ||
      this.teacherDetails.email === "" ||
      this.teacherDetails.password === "" ||
      this.teacherDetails.materie === ""
    ) {
      alert("Please fill all the filds");
    } else {
      this.teacherService.addTch(this.teacherDetails).subscribe(
        (data) => {
          this.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngOnInit(): void {}
}
