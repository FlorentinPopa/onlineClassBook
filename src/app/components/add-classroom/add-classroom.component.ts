import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { IClassName } from "src/app/interfaces/iclass-name";
import { IGrade } from "src/app/interfaces/igrade";
import { IStudent } from "src/app/interfaces/istudent";
import { ITeacher } from "src/app/interfaces/iteacher";
import { ClassRoomService } from "src/app/services/class-room.service";
import { StudentDetailsService } from "src/app/services/student-details.service";
import { StudentsService } from "src/app/services/students.service";
import { TeachersService } from "src/app/services/teachers.service";

@Component({
  selector: "app-add-classroom",
  templateUrl: "./add-classroom.component.html",
  styleUrls: ["./add-classroom.component.scss"],
})
export class AddClassroomComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable, { static: false })
  table!: MatTable<any>;
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  displayedColumns: string[] = [
    // "id",
    "numeClasa",
    "numeElev",
    "numeProfesor",
    "actions",
    // 'classa',
  ];
  selectData: any[] = [];
  classList: MatTableDataSource<any> = new MatTableDataSource();

  newClassRoom: Subscription;
  getTch: Subscription;
  getClss: Subscription;
  getStd: Subscription;
  getClsDet: Subscription;

  clsName: IClassName;
  std: IStudent[];
  validMessage: string = "";
  stdGradeDetails: IGrade;
  studentName: string = "Elev";
  studentNote: string = "Alege nota";
  teacherName: string = "Profesor";
  materieProfesor: string = "Materia";
  gradesValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  tch: ITeacher[];
  tchByID: ITeacher = {
    name: "",
    materie: "",
    email: "",
    id: null,
    password: "",
  };
  clsNameArr: IClassName[];

  clsVisible: boolean = false;
  detailsVisible: boolean = false;
  addGradesVisible: boolean = false;
  constructor(
    private classRoomService: ClassRoomService,
    private studentService: StudentsService,
    private teacherService: TeachersService,
    private studentDetails: StudentDetailsService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder
  ) {}

  clsDetails = this.fb.group({
    numeClasa: new FormControl(""),
    ElevID: new FormControl(""),
    ProfesorID: new FormControl(""),
  });

  openSnackBar() {
    this._snackBar.open(this.validMessage, "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000,
    });
  }

  showCls() {
    this.clsVisible = true;
    this.detailsVisible = false;
    this.addGradesVisible = false;
  }

  showAssign() {
    this.detailsVisible = true;
    this.clsVisible = false;
    this.addGradesVisible = false;
  }

  showAddGrades() {
    this.addGradesVisible = true;
    this.clsVisible = false;
    this.detailsVisible = false;
  }

  addNewClassRoom() {
    this.newClassRoom = this.classRoomService
      .createClassRoom(this.clsName)
      .subscribe(
        (data) => {},
        (err) => {}
      );
  }

  students: any;

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

  getCls() {
    this.getClss = this.classRoomService.getAllClassRooms().subscribe(
      (data) => {
        this.clsNameArr = data;
        console.log(this.clsNameArr);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTeachers() {
    this.getTch = this.teacherService.getAllTch().subscribe(
      (data) => {
        console.log("localstorage:");
        console.log("/n");
        console.log(JSON.parse(localStorage.getItem("id")));
        this.tch = data;
        console.log(this.tch);
        for (const i of data) {
          if (this.tchByID.id === i.id) {
            this.tchByID.name = i.name;
            this.tchByID.password = i.password;
            this.tchByID.email = i.email;
            this.tchByID.materie = i.materie;
          }
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  readClsDetails() {
    this.getClsDet = this.classRoomService.getClsDetails().subscribe(
      (data) => {
        this.classList = new MatTableDataSource(data);
        this.classList.sort = this.sort;
        this.classList.paginator = this.paginator;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  changeStudent($e) {
    this.clsDetails.patchValue({ ElevID: $e.target.value });
  }

  changeCls(e) {
    this.clsDetails.patchValue({ numeClasa: e.target.value });
  }

  changeTch(e) {
    this.clsDetails.patchValue({ ProfesorID: e.target.value });
  }

  assignDetails() {
    this.classRoomService.assignStd(this.clsDetails.value).subscribe(
      (data) => {
        console.log(data);
        alert("Student assigned!");
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.ngOnInit();
      }
    );
  }

  public resetForm() {
    this.clsDetails = this.fb.group({
      numeClasa: ["Chose a student"],
      ElevID: [""],
      ProfesorID: [""],
    });
    this.clsDetails.markAllAsTouched();
  }

  addStdGrade() {
    if (this.studentName && this.studentNote) {
      const studentData = {
        idElev: this.studentName,
        idProfesor: this.teacherName,
        nota: this.studentNote,
        numeMaterie: this.materieProfesor,
      };
      this.studentDetails.addStudentGrades(studentData).subscribe((data) => {
        this.validMessage = `Am adaugat nota: ${studentData.nota}`;
        this.openSnackBar();
        this.ngOnDestroy;
        this.ngOnInit;
      });
    } else {
      window.alert("Wrong Details!");
    }
  }

  ngOnInit(): void {
    this.tchByID.id = parseInt(localStorage.getItem("id"));
    this.getStudents();
    this.getCls();
    this.getTeachers();
    this.readClsDetails();
  }

  onSubmit() {
    console.log(this.clsDetails.value);
  }

  ngOnDestroy(): void {
    this.getClss.unsubscribe();
    this.getStd.unsubscribe();
    this.getTch.unsubscribe();
    this.getClsDet.unsubscribe();
  }
}
