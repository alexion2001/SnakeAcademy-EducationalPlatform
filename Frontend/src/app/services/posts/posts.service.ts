import {HttpInterceptor, HttpRequest,HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public baseURL= 'https://localhost:7271/api/'

  public urlPosts =  this.baseURL + 'Post';
  public urlComents =  this.baseURL +'Comment';
  public urlLike =  this.baseURL +'Like';

  constructor(
    public http: HttpClient,
  ) { }

    public getAllPosts(): Observable<any>{
      return this.http.get(`${this.urlPosts}`);
    }
    public getPost(idPost:any): Observable<any>{
      return this.http.get(`${this.urlPosts + '/idPost?idPost=' + idPost}`);
    }
    public getPostComments(idPost:any): Observable<any>{
      return this.http.get(`${this.urlComents + '/idPost?idPost=' + idPost}`);
    }

    public putPost(post: any): Observable<any> {    
    
      return this.http.post(`${this.urlPosts}`, post);
    }
    public putComment(comm: any): Observable<any> {    
    
      return this.http.post(`${this.urlComents}`, comm);
    }
    public putLike(like: any): Observable<any> {    
    
      return this.http.post(`${this.urlLike}`, like);
    }

    public deleteComment(commentId:any ): Observable<any> {    
      const token = "Bearer " + localStorage.getItem("Token");
      const headers = new HttpHeaders({
        "Authorization": token
      });
      const options = {
        headers: headers,
        body: commentId
      };
  
      return this.http.delete(`${this.urlComents}`, options);
    }

    // public deletePost(postId:any ): Observable<any> {    
    //   const token = "Bearer " + localStorage.getItem("Token");
    //   const headers = new HttpHeaders({
    //     "Authorization": token
    //   });
  
    //   const options = {
    //     headers: headers,
    //     body: postId
    //   };
    //   return this.http.delete(`${this.urlPosts}`, options);
    // }
  

}
