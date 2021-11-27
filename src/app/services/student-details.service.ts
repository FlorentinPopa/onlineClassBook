import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IstudentDetails } from "../interfaces/istudent-details";

@Injectable({
  providedIn: "root",
})
export class StudentDetailsService {
  constructor(private http: HttpClient) {}

  apiURL = "http://sdaproject.tk/";

  httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/JSON",
    }),
  };

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
}
