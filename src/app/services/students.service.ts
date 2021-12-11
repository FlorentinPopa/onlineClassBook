import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Student } from "../classes/student";
import { IStudent } from "../interfaces/istudent";

@Injectable({
  providedIn: "root",
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  apiURL = "http://sdaproject.tk/api/";

  httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/JSON",
    }),
  };

  getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.apiURL + "elevi");
  }

  getStudent(studentID): Observable<any> {
    return this.http.get<any>(this.apiURL + "elevi/" + studentID);
  }

  addStudent(student): Observable<any> {
    return this.http.post(
      this.apiURL + "elevi",
      JSON.stringify(student),
      this.httpHeaders
    );
  }

  editStudent(studentID: number, studentDetails: Student): Observable<any> {
    return this.http
      .put(
        this.apiURL + "elevi/" + studentID,
        JSON.stringify(studentDetails),
        this.httpHeaders
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  removeStudent(studentID): Observable<any> {
    return this.http.delete(this.apiURL + "elevi/" + studentID);
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
