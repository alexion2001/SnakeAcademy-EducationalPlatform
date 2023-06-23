import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public baseURL= 'https://localhost:7271/api/'

  public urlStudentsInfo =  this.baseURL +'User'; 
  public urlStudentsNotification =  this.baseURL +'Notification'; 
  public urlAccount =  this.baseURL + 'Account';
  public urlFriend =  this.baseURL + 'Friend';
                                


  constructor(
    public http: HttpClient,
  ) { }

  public getStudentInfo(idUser: string): Observable<any>{ //get students info with followers
    return this.http.get(`${this.urlStudentsInfo + "/GetFriends/" + idUser}`);
  }
  public getStudentScore(idUser: string): Observable<any>{ 
    return this.http.get(`${this.urlStudentsInfo + "/GetScore/" + idUser}`);
  }

  public getStudentNotifications(idUser: string): Observable<any>{ //get students notifications
    return this.http.get(`${this.urlStudentsNotification + "/getNotifications/" + idUser}`);
  }
  public getSearchFriends(name: any): Observable<any> {    
    
    return this.http.get(`${this.urlStudentsInfo + '/Search/' + name}`);
  }

  public getStudentId(email: string): Observable<any>{ //get students notifications
    return this.http.get(`${this.urlAccount + "/email?email=" +email}`);
  }
  public getFriend(userId: any,friendId: any): Observable<any> {    
    
    return this.http.get(`${this.urlFriend + '/singleFriend?idFriend=' + friendId + '&idUser=' +userId}`);
  }

  public updateStatus(notificationId : string): Observable<any>{
    return this.http.patch(`${this.urlStudentsNotification + "/updateStatus/" + notificationId}`,notificationId);
  }
  public updateRank(userId : string, rank: string): Observable<any>{
    return this.http.patch(`${this.urlStudentsInfo + "/updateRank/" + userId +"?rank=" + rank}`,rank); 
  }
  public updateAvatar(userId : string, avatar: string): Observable<any>{
    return this.http.patch(`${this.urlStudentsInfo + "/updateAvatar/" + userId +"?avatarIndex=" + avatar}`,avatar); 
  }
  public updateBio(userId : string, bio: string): Observable<any>{
    return this.http.patch(`${this.urlStudentsInfo + "/updateBio/" + userId +"?bio=" + bio}`,bio); 
  }

  public putLogin(user: any): Observable<any> {    
    
    return this.http.post(`${this.urlAccount + '/login'}`, user);
  }

  public putRegister(user: any): Observable<any> {       
    return this.http.post(`${this.urlAccount + '/register'}`, user);
  }

  public putNotification(notification: any): Observable<any> {    
    
    return this.http.post(`${this.urlStudentsNotification}`, notification);
  }

  public putFriend(friend: any): Observable<any> {    
    
    return this.http.post(`${this.urlFriend + '/createFriendship'}`, friend);
  }

  public deleteFriend(friend:any ): Observable<any> {    
    const options = {
      headers: new HttpHeaders(),
      body: friend
    };
    return this.http.delete(`${this.urlFriend}`, options);
  }




  

  
}
