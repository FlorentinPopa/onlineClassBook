import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { IGrade } from "../interfaces/igrade";
import { IstudentDetails } from "../interfaces/istudent-details";

@Injectable({
  providedIn: "root",
})
export class StudentDetailsService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  validMessage: string = "";
  apiURL = "http://sdaproject.tk/api/";

  httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/JSON",
    }),
  };

  addStudentGrades(details): Observable<IGrade> {
    return this.http
      .post<IGrade>(this.apiURL + "note", details, this.httpHeaders)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getStudentGrades(id: number): Observable<IstudentDetails[]> {
    return this.http.get<IstudentDetails[]>(
      this.apiURL + "detaliinote/" + id,
      this.httpHeaders
    );
  }

  getAllStudentsGrades(): Observable<IstudentDetails[]> {
    return this.http.get<IstudentDetails[]>(
      this.apiURL + "detaliinote",
      this.httpHeaders
    );
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.validMessage = errorMessage;
    this.openSnackBar();
    return throwError(errorMessage);
  }

  openSnackBar() {
    this._snackBar.open(this.validMessage, "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000,
    });
  }
}
