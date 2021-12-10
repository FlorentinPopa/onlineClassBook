import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";
import { bookData } from "src/app/interfaces/istudent-book";
import { StudentNewsService } from "src/app/services/student-news.service";
import { INews } from "./inews";
import { IstudentNews } from "./istudent-news";

@Component({
  selector: "app-student-news",
  templateUrl: "./student-news.component.html",
  styleUrls: ["./student-news.component.scss"],
})
export class StudentNewsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  news = {} as INews;
  booksData: Subscription;
  newsFeed = [] as IstudentNews[];
  booksFeed: bookData[];
  obs: Observable<bookData[]>;
  searchKey: boolean = false;
  filter: string;
  constructor(private newsService: StudentNewsService) {}
  dataSource: MatTableDataSource<bookData> = new MatTableDataSource();

  getBooks() {
    this.booksData = this.newsService.getBooks().subscribe(
      (data) => {
        this.booksFeed = data.data;
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        console.log(this.dataSource);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEventValue($event: any): string {
    return ($event.target as HTMLInputElement).value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filter) {
      this.searchKey = true;
    }
  }

  onSearchClear() {
    this.filter = "";
    this.searchKey = false;
    this.dataSource.filter = "";
  }

  ngOnInit(): void {
    this.getBooks();
    console.log(this.obs);
  }

  ngOnDestroy(): void {
    this.booksData.unsubscribe();
  }
}
