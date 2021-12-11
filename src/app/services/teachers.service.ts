import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Teacher } from "../classes/teacher";
import { ITeacher } from "../interfaces/iteacher";

@Injectable({
  providedIn: "root",
})
export class TeachersService {
  apiURL = "http://sdaproject.tk/api/";

  httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/JSON",
    }),
  };
  constructor(private http: HttpClient) {}

  getAllTch(): Observable<ITeacher[]> {
    return this.http
      .get<ITeacher[]>(this.apiURL + "profesori", this.httpHeaders)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTchByID(id): Observable<ITeacher> {
    return this.http
      .get<ITeacher>(this.apiURL + "profesori/" + id, this.httpHeaders)
      .pipe(retry(1), catchError(this.handleError));
  }

  addTch(details): Observable<ITeacher> {
    return this.http
      .post<ITeacher>(this.apiURL + "Profesori", details, this.httpHeaders)
      .pipe(retry(1), catchError(this.handleError));
  }

  editTch(id: number, details: Teacher): Observable<Teacher> {
    return this.http
      .put<Teacher>(this.apiURL + "profesori/" + id, details, this.httpHeaders)
      .pipe(retry(1), catchError(this.handleError));
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
