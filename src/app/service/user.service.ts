import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  ApiUrl = "http://localhost:3000/user/"

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<any>(this.ApiUrl)
  }

  public createUser(data: User){
    return this.http.post<User>(this.ApiUrl, data);
  }

  public deleteUSer(userId: any ){
    return this.http.delete<User>(`${this.ApiUrl}/${userId}`);
  }

  public updateUser(userId: string, data: User){
    return this.http.put<User>(`${this.ApiUrl}/${userId}`, data);
  }

  public getUser(userId: any): Observable<User>{
    return this.http.get<User>(`${this.ApiUrl}/${userId}`)
  }
}
