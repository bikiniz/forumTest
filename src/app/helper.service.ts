import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthor } from './model/iauthor';
import { IPost } from './model/ipost';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient) {}

  public getAuthorsData(): Observable<IAuthor[]> {
   
    try{
      let url = 'https://maqe.github.io/json/authors.json';
      return   this.http.get<IAuthor[]>(url);
    }
    catch(ex){
      Swal.fire({
      text: 'Something was wrong : ' + ex,
      icon: 'error',
      confirmButtonText: 'ok'});
      throw ex;
    }

  }

  public getpostsData(): Observable<IPost[]> {
    return this.http.get<IPost[]>('https://maqe.github.io/json/posts.json');
  }
}


