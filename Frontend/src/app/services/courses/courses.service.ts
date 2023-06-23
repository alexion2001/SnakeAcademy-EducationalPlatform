import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public baseURL= 'https://localhost:7271/api/'

  public urlStudents = this.baseURL + 'User'; 
  public urlChapters = this.baseURL + 'Chapter'; 
  public urlResult = this.baseURL + 'QuizResult';
  public urlLesson = this.baseURL + 'Lesson';
  public urlQuiz = this.baseURL + 'Quiz';


  constructor(
    public http: HttpClient,
  ) { }



  public getStudentsByRank(rank: string): Observable<any>{ 
    return this.http.get(`${this.urlStudents + "/GetByRank/" + rank}`);
  }
  public getAllChapters(userId: string): Observable<any>{ 
    return this.http.get(`${this.urlChapters+ '?idUser='+ userId}`); 
  }
  public getAllQuizResult(idUser: string): Observable<any>{ 
    return this.http.get(`${this.urlResult + '/getAllFromUser/' + idUser}`); 
  }
  public getChapterLessons(idChapter: string): Observable<any>{ 
    return this.http.get(`${this.urlLesson + '/getAllLessonsByChapter/' + idChapter}`); 
  }
  public getAllLesson(): Observable<any>{ 
    return this.http.get(`${this.urlLesson + '/getAllLessons'}`); 
  }
  public getChapters(): Observable<any>{ 
    return this.http.get(`${this.urlChapters + '/getAll'}`); 
  }
  public getLesson(idLesson: string): Observable<any>{ 
    return this.http.get(`${this.urlLesson + '/getLesson/' + idLesson}`); 
  }
  public getQuiz(idChapter: string): Observable<any>{ 
    return this.http.get(`${this.urlQuiz + '/getWithQuestions/' + idChapter}`); 
  }
  public getQuizResult(idQuiz: string, idUser:string): Observable<any>{ 
    return this.http.get(`${this.urlResult + '/getById/' + idQuiz + '/' + idUser}`); 
  }

  public getQuizNumber(): Observable<any>{ 
    return this.http.get(`${this.urlQuiz + '/getAll'}`); 
  }

  public putQuizResult(result: any): Observable<any> {    
    
    return this.http.post(`${this.urlResult}`, result);
  }

  public putChapter(result: any): Observable<any> {    
    
    return this.http.post(`${this.urlChapters}`, result);
  }
  public putQuiz(result: any): Observable<any> {    
    
    return this.http.post(`${this.urlQuiz}`, result);
  }
  public putLesson(result: any): Observable<any> {    
    
    return this.http.post(`${this.urlLesson}`, result);
  }

  public updateQuizResult(idQuiz: string, idUser:string, score:number): Observable<any>{
    return this.http.patch(`${this.urlResult + "/updateScore/" + idQuiz + '/' + idUser + '/' + score}`,score);
    
  }
  public updateLesson(userId : string): Observable<any>{
    return this.http.patch(`${this.urlStudents + "/updateLesson/" + userId}`,userId); 
  }
  public updateLessonContent(lesson: any): Observable<any>{
    return this.http.patch(`${this.urlLesson + "/updateLesson"}`,lesson); 
     }

}
