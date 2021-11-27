import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { forkJoin, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { Student } from "src/app/classes/student";
import { IclassRooms } from "src/app/interfaces/iclass-rooms";
import { ClassRoomService } from "src/app/services/class-room.service";
import { StudentsService } from "src/app/services/students.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable, { static: false })
  table!: MatTable<Student>;
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  displayedColumns: string[] = [
    "id",
    "nume",
    "email",
    "password",
    "actions",
    // 'classa',
  ];
  selectedStudent: Student = new Student();
  isVisible = false;
  addUserView = false;
  studentGrd = false;
  validMessage: string = "";
  getStd: Subscription;

  selectData: any[] = [];
  errorMessage: string = "";

  constructor(
    private studentsService: StudentsService,
    private classroomService: ClassRoomService,
    private _snackBar: MatSnackBar
  ) {}

  listData: MatTableDataSource<any> = new MatTableDataSource();
  classroomList: IclassRooms[];
  searchKey: string = "";
  studentsData: any[];

  addStd() {
    this.addUserView = true;
    this.isVisible = false;
    this.studentGrd = false;
  }

  showGrd(stdInfo: Student) {
    this.isVisible = false;
    this.studentGrd = true;
    this.addUserView = false;
    this.selectedStudent = Object.assign({}, stdInfo);
  }

  getStudents() {
    this.getStd = this.studentsService.getStudents().subscribe(
      (data) => {
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      (err) => {
        console.error(err);
      }
    );

    // const studentsDetails = [
    //   this.studentsService.getStudents(),
    //   this.classroomService.getAllClassRooms(),
    // ];
    // forkJoin(studentsDetails)
    //   .pipe(take(1))
    //   .subscribe(
    //     (data) => {
    //       this.studentsData = data[0];
    //       this.studentsData.forEach((student) => {
    //         data[1].forEach((classroom) => {
    //           if (student.id === classroom.ElevID) {
    //             student.className = classroom.numeClasa;
    //             console.log("Console log din subscribe: ");
    //             console.log(student);
    //             console.log("\n");
    //           }
    //         });
    //       });
    //       this.listData = new MatTableDataSource(this.studentsData);
    //       this.listData.sort = this.sort;
    //       this.listData.paginator = this.paginator;
    //       console.log("console log dupa populare mat-table: ");
    //       console.log(this.studentsData);
    //       console.log("\n");
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }
  showDetails(student: Student) {
    this.isVisible = true;
    this.studentGrd = false;
    this.addUserView = false;
    this.selectedStudent = Object.assign({}, student);
  }

  update(student: Student) {
    console.log(student);
    const id = student.id;
    this.studentsService.editStudent(id, student).subscribe(
      (data) => {
        this.validMessage = "Student details updated";
        this.openSnackBar();
        this.getStudents();
        this.isVisible = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteStudent(id: number) {
    this.studentsService.removeStudent(id).subscribe({
      next: (data) => {
        this.validMessage = "Student removed!";
        this.openSnackBar();
        this.getStudents();
      },
      error: (error) => {
        console.error("There was an error!", error);
        this.validMessage = error.message;
        this.openSnackBar();
      },
    });
  }

  openSnackBar() {
    this._snackBar.open(this.validMessage, "", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
    });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  ngOnDestroy() {
    this.getStd.unsubscribe();
  }
}
