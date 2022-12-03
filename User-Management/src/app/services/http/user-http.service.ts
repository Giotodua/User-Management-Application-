import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private httpClients: HttpClient) { }

  getAll(): Observable<User[]> {
    const queryParams = '?_expand=status&_expand=category';
    const fullApiUrl = `${environment.serverBaseUrl}/users${queryParams}`;
    return this.httpClients.get<User[]>(fullApiUrl);
  }

  create(user: User): Observable<User> {
    const fullApiUrl = `${environment.serverBaseUrl}/users`;
    return this.httpClients.post<User>(fullApiUrl, user);
  }

  getById(id: number): Observable<User> {
    const queryParams = '?_expand=status&_expand=category';
    const fullApiUrl = `${environment.serverBaseUrl}/users/${id}${queryParams}`;
    return this.httpClients.get<User>(fullApiUrl);
  }

  update(id: number, user: User): Observable<User> {
    const fullApiUrl = `${environment.serverBaseUrl}/users/${id}`;
    return this.httpClients.put<User>(fullApiUrl, user)
  }

  delete(id: number): Observable<User> {
    const fullApiUrl = `${environment.serverBaseUrl}/users/${id}`;
    return this.httpClients.delete<User>(fullApiUrl);
  }
}

