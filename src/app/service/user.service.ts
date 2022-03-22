import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  ApiUrl = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<any>(this.ApiUrl);
  }

  public createUser(data: IUser){
    return this.http.post<IUser>(this.ApiUrl, data);
  }

  public deleteUSer(userId: any ){
    return this.http.delete<IUser>(`${this.ApiUrl}/${userId}`);
  }

  public updateUser(userId: string, data: IUser){
    return this.http.put<IUser>(`${this.ApiUrl}/${userId}`, data);
  }

  public getUser(userId: any): Observable<IUser>{
    return this.http.get<IUser>(`${this.ApiUrl}/${userId}`)
  }
}
