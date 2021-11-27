import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { Teacher } from "src/app/classes/teacher";
import { ITeacher } from "src/app/interfaces/iteacher";
import { TeachersService } from "src/app/services/teachers.service";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"],
})
export class TeachersComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable, { static: false })
  table!: MatTable<any>;
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  selectedTeacher: Teacher = new Teacher();

  displayedColumns: string[] = [
    "id",
    "name",
    "materie",
    "email",
    "password",
    "actions",
    // 'classa',
  ];

  constructor(private teacherService: TeachersService) {}

  getT: Subscription;
  tchList: ITeacher[];
  isVisible: boolean = false;
  listTchData: MatTableDataSource<any> = new MatTableDataSource();
  selectData: any[] = [];
  teacherView: boolean = false;

  getTch() {
    this.getT = this.teacherService.getAllTch().subscribe(
      (data) => {
        this.listTchData = new MatTableDataSource(data);
        this.listTchData.sort = this.sort;
        this.listTchData.paginator = this.paginator;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  addTch() {
    this.teacherView = true;
    this.isVisible = false;
  }

  update(teacher: Teacher) {
    this.teacherService.editTch(teacher.id, teacher).subscribe(
      (data) => {
        this.getTch();
        this.isVisible = false;
      },
      (err) => {
        console.log("eroare:");
        console.log(err);
      }
    );
  }
  showDetails(teacher: Teacher) {
    this.isVisible = true;
    this.teacherView = false;
    this.selectedTeacher = Object.assign({}, teacher);
  }
  ngOnInit(): void {
    this.getTch();
  }

  ngOnDestroy(): void {
    this.getT.unsubscribe();
  }
}
