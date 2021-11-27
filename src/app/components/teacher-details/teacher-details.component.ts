import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Teacher } from "src/app/classes/teacher";

@Component({
  selector: "app-teacher-details",
  templateUrl: "./teacher-details.component.html",
  styleUrls: ["./teacher-details.component.scss"],
})
export class TeacherDetailsComponent implements OnInit {
  @Input() teacher: Teacher = new Teacher();
  @Output() teacherChange: EventEmitter<Teacher> = new EventEmitter<Teacher>();
  constructor() {}

  ngOnInit(): void {}

  update() {
    this.teacherChange.emit(this.teacher);
  }
}
