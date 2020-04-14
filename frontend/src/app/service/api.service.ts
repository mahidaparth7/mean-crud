import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private REST_API_SERVER = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  public getUsers(params: any) {
    return this.httpClient.get<{ data: Array<Object> }>(
      `${this.REST_API_SERVER}/api/user/paginate?page=${params.page}&limit=${params.limit}`
    );
  }
  public getUser(userId: string) {
    return this.httpClient.get<{ data: Array<Object> }>(
      `${this.REST_API_SERVER}/api/user/${userId}`
    );
  }
  public addUser(user: User) {
    return this.httpClient.post(
      `${this.REST_API_SERVER}/api/user/create`,
      user
    );
  }
  public updateUser(user: User, userId: string) {
    return this.httpClient.put(
      `${this.REST_API_SERVER}/api/user/${userId}`,
      user
    );
  }
  public removeUser(userId: string) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/api/user/${userId}`);
  }
}
