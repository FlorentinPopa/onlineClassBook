import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IClassName } from "../interfaces/iclass-name";
import { IclassRooms } from "../interfaces/iclass-rooms";

@Injectable({
  providedIn: "root",
})
export class ClassRoomService {
  apiURL = "http://sdaproject.tk/api/";

  httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/JSON",
    }),
  };

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  validMessage: string = "";

  getClassRoomByID(id): Observable<IClassName> {
    return this.http.get<IClassName>(this.apiURL + "cls/" + id);
  }

  getAllClassRooms(): Observable<IClassName[]> {
    return this.http.get<IClassName[]>(this.apiURL + "cls");
  }

  createClassRoom(className: IClassName): Observable<IClassName> {
    return this.http.post<IClassName>(
      this.apiURL + "cls",
      JSON.stringify(className),
      this.httpHeaders
    );
  }

  getClsDetails(): Observable<any> {
    return this.http.get(this.apiURL + "classdetails", this.httpHeaders);
  }

  removeClassRoom(id): Observable<IclassRooms> {
    return this.http.delete<IclassRooms>(this.apiURL + "clase/" + id);
  }

  assignStd(details): Observable<IclassRooms> {
    return this.http
      .post<IclassRooms>(
        this.apiURL + "clase",
        JSON.stringify(details),
        this.httpHeaders
      )
      .pipe(catchError(this.handleError.bind(this)));
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
