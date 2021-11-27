import { Component, OnInit } from '@angular/core';
import { StudentNewsService } from 'src/app/services/student-news.service';
import { INews } from './inews';
import { IstudentNews } from './istudent-news';

@Component({
  selector: 'app-student-news',
  templateUrl: './student-news.component.html',
  styleUrls: ['./student-news.component.scss'],
})
export class StudentNewsComponent implements OnInit {
  news = {} as INews;
  newsFeed = [] as IstudentNews[];
  constructor(private newsService: StudentNewsService) {}

  getAllNews() {
    return this.newsService.getNews().subscribe(
      (data) => {
        this.news = data;
        for (let item of this.news.articles) {
          this.newsFeed.push(item);
        }
        // for (let item of this.news.articles[]) {
        //   this.newsFeed.push(item.articles);
        // }
        // console.log(this.news);
        console.log(this.newsFeed);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.getAllNews();
  }
}
