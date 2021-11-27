import { IstudentNews } from './istudent-news';
export interface INews {
  status: string;
  totalResults: number;
  articles: IstudentNews[];
}
