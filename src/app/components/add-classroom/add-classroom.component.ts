import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { IClassName } from "src/app/interfaces/iclass-name";
import { IclassRooms } from "src/app/interfaces/iclass-rooms";
import { IStudent } from "src/app/interfaces/istudent";
import { ITeacher } from "src/app/interfaces/iteacher";
import { ClassRoomService } from "src/app/services/class-room.service";
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
  tch: ITeacher[];
  clsNameArr: IClassName[];

  clsVisible: boolean = false;
  detailsVisible: boolean = false;
  constructor(
    private classRoomService: ClassRoomService,
    private studentService: StudentsService,
    private teacherService: TeachersService,
    public fb: FormBuilder
  ) {}

  clsDetails = this.fb.group({
    numeClasa: new FormControl(""),
    ElevID: new FormControl(""),
    ProfesorID: new FormControl(""),
  });

  showCls() {
    this.clsVisible = true;
    this.detailsVisible = false;
  }

  showAssign() {
    this.detailsVisible = true;
    this.clsVisible = false;
  }

  addNewClassRoom() {
    this.newClassRoom = this.classRoomService
      .createClassRoom(this.clsName)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.error(err);
          // console.log(err);
          console.log(this.clsName);
        }
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
        this.tch = data;
        console.log(this.tch);
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
        // this.clsDetails.reset();
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        // this.clsDetails.reset();
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

  ngOnInit(): void {
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
