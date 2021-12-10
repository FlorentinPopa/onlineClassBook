import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { INews } from "../components/students/student-news/inews";
import { IStudentBook } from "../interfaces/istudent-book";

@Injectable({
  providedIn: "root",
})
export class StudentNewsService {
  apiURL = "https://newsapi.org/v2/top-headlines?country=ro&apiKey=";
  apiKey = atob(btoa("8be763d1cd1f4b70a872a2b1a08bbcd5"));

  adServioAPI =
    "https://www.adservio.ro/api/v2/biblioteca?filterSearch=&catID=&_limit=400";

  constructor(private http: HttpClient) {}

  getNews(): Observable<INews> {
    return this.http
      .get<INews>(this.apiURL + this.apiKey)
      .pipe(retry(1), catchError(this.handleError));
  }

  getBooks(): Observable<IStudentBook> {
    return this.http
      .get<IStudentBook>(this.adServioAPI)
      .pipe(retry(1), catchError(this.handleError));
  }

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
