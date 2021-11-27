import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Student } from "src/app/classes/student";

@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.component.html",
  styleUrls: ["./student-details.component.scss"],
})
export class StudentDetailsComponent implements OnInit {
  @Input() student: Student = new Student();
  @Output() studentChange: EventEmitter<Student> = new EventEmitter<Student>();
  constructor() {}

  ngOnInit(): void {}

  update() {
    this.studentChange.emit(this.student);
  }
}
