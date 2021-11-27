import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IStudent } from "src/app/interfaces/istudent";
import { StudentsService } from "src/app/services/students.service";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
})
export class AddStudentComponent implements OnInit {
  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  studentDetails: IStudent = {
    nume: "",
    email: "",
    password: "",
  };

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["./"], { relativeTo: this.route });
  }

  addStd() {
    if (
      this.studentDetails.nume === "" ||
      this.studentDetails.email === "" ||
      this.studentDetails.password === ""
    ) {
      alert("Please fill all the filds");
    } else {
      this.studentService.addStudent(this.studentDetails).subscribe(
        (data) => {
          console.log(data);
          console.log(this.studentDetails);
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
