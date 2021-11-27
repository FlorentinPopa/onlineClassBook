import { Component, Input, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { Student } from "src/app/classes/student";
import { IStudent } from "src/app/interfaces/istudent";
import { IstudentDetails } from "src/app/interfaces/istudent-details";
import { ITeacher } from "src/app/interfaces/iteacher";
import { StudentDetailsService } from "src/app/services/student-details.service";
import { StudentsService } from "src/app/services/students.service";

@Component({
  selector: "app-student-grades",
  templateUrl: "./student-grades.component.html",
  styleUrls: ["./student-grades.component.scss"],
})
export class StudentGradesComponent implements OnInit, OnDestroy {
  @Input() stdInfo: Student = new Student();

  ssss = {
    idElev: this.stdInfo.id,
  };

  isVisible: boolean;
  stdGrades: IstudentDetails[];
  allStdGrades: IstudentDetails[];
  std: IStudent[];
  tch: ITeacher[];
  getStd: Subscription;
  getStdGrd: Subscription;
  getAllStdGrd: Subscription;
  studentsData: any[];
  situatieNote = [
    { Romana: [] },
    { Matematica: [] },
    { Fizica: [] },
    { Chimie: [] },
    { Biologie: [] },
    { Geografie: [] },
    { Istorie: [] },
  ];

  constructor(
    private studentDetails: StudentDetailsService,
    private studentService: StudentsService,
    public fb: FormBuilder
  ) {}

  stdDetails = this.fb.group({
    idElev: new FormControl(""),
  });

  getStudents() {
    this.getStd = this.studentService.getStudents().subscribe(
      (data) => {
        this.std = data;
        console.log(this.std);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  rcvStdGrd() {
    this.getStdGrd = this.studentDetails
      .getStudentGrades(this.stdInfo.id)
      .subscribe(
        (data) => {
          this.stdGrades = data;
          this.isVisible = true;

          // console.log("stdGrades:");
          // console.log("/n");
          // console.log(this.stdGrades);
          // for (let i of this.stdGrades) {
          //   if (i.numeMaterie === "Romana") {
          //     console.log(i.nota);
          //     this.situatieNote[0].Romana.push(i.nota);
          //   } else if (i.numeMaterie === "Matematica") {
          //     this.situatieNote[1].Matematica.push(i.nota);
          //     console.log(this.situatieNote);
          //   } else if (i.numeMaterie === "Fizica") {
          //     this.situatieNote[2].Fizica.push(i.nota);
          //     console.log(this.situatieNote);
          //   } else if (i.numeMaterie === "Chimie") {
          //     this.situatieNote[3].Chimie.push(i.nota);
          //     console.log(this.situatieNote);
          //   } else if (i.numeMaterie === "Biologie") {
          //     this.situatieNote[4].Biologie.push(i.nota);
          //     console.log(this.situatieNote);
          //   } else if (i.numeMaterie === "Geografie") {
          //     this.situatieNote[5].Geografie.push(i.nota);
          //     console.log(this.situatieNote);
          //   } else if (i.numeMaterie === "Istorie") {
          //     this.situatieNote[6].Istorie.push(i.nota);
          //     console.log(this.situatieNote);
          //   }
          // }
        },
        (err) => {
          // console.log("value " + this.stdDetails.value);
          // console.log("\n");
          // console.log("value.idElev " + this.stdDetails.value.idElev);
          console.log(err);
          this.isVisible = false;
        }
      );
  }

  rcvAllStdGrd() {
    this.getAllStdGrd = this.studentDetails.getAllStudentsGrades().subscribe(
      (data) => {
        this.allStdGrades = data;
        console.log(this.allStdGrades);
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  changeStudent($e) {
    this.stdDetails.patchValue({ idElev: $e.target.value });
    this.isVisible = false;
    this.rcvStdGrd();
  }

  ngOnInit(): void {
    // this.getStudents();
    this.rcvStdGrd();
  }

  ngOnDestroy(): void {
    if (this.getAllStdGrd) {
      this.getAllStdGrd.unsubscribe();
    }
    if (this.getStd) {
      this.getStd.unsubscribe();
    }
    if (this.getStdGrd) {
      this.getStdGrd.unsubscribe();
    }
  }

  ngOnChanges(): void {
    // this.stdDetails.patchValue({ idElev: $e.target.value });
    this.ngOnDestroy();
    this.rcvStdGrd();
  }
}
