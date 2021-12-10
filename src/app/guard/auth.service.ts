import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { ITeacher } from "../interfaces/iteacher";
import { TeachersService } from "../services/teachers.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  findUser: ITeacher;
  email: "";
  password: "";
  id: number;
  wrongDetails = true;
  isVisible: boolean = false;

  constructor(
    public router: Router,
    private teacherService: TeachersService,
    private _snackBar: MatSnackBar
  ) {}
  validMessage: string = "";

  openSnackBar() {
    this._snackBar.open(this.validMessage, "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000,
    });
  }

  signIn() {
    this.teacherService
      .getAllTch()
      .pipe(take(1))
      .subscribe((data: ITeacher[]) => {
        this.findUser = data.find(
          (item: ITeacher) => item.email === this.email
        );
        if (this.findUser) {
          if (this.findUser.password === this.password) {
            localStorage.setItem(
              "currentUser",
              JSON.stringify(this.findUser.name)
            );
            localStorage.setItem("id", JSON.stringify(this.findUser.id));
            this.router.navigate(["profesori"]);
            this.clearInput();
          } else {
            localStorage.removeItem("currentUser");
            this.validMessage = "Wrong details! Check it again!";
            this.openSnackBar();
          }
        } else {
          localStorage.removeItem("currentUser");
          this.validMessage = "Wrong details! Check it again!";
          this.openSnackBar();
          this.clearInput();
        }
      });
  }

  clearInput() {
    this.email = "";
    this.password = "";
    this.id = null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user !== null ? true : false;
  }

  // Sign out
  SignOut() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("id");
    this.router.navigate(["home"]);
  }
}
