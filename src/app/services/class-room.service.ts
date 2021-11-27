import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IClassName } from "../interfaces/iclass-name";
import { IclassRooms } from "../interfaces/iclass-rooms";

@Injectable({
  providedIn: "root",
})
export class ClassRoomService {
  apiURL = "http://sdaproject.tk/";

  httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/JSON",
    }),
  };

  constructor(private http: HttpClient) {}

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
    return this.http.post<IclassRooms>(
      this.apiURL + "clase",
      JSON.stringify(details),
      this.httpHeaders
    );
  }
}
