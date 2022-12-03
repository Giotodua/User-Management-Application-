import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusHttpService {

  constructor(
    private httpClients: HttpClient
  ) { }

  getAll(pageIndex?: number, limit?: number): Observable<HttpResponse<Status[]>> {
    const queryParams = `?_page=${pageIndex}&_limit=${limit}`;
    const fullApiUrl = `${environment.serverBaseUrl}/statuses${queryParams}`;
    return this.httpClients.get<Status[]>(fullApiUrl, { observe: "response" });
  }

  create(status: Status): Observable<Status> {
    const fullApiUrl = `${environment.serverBaseUrl}/statuses`;
    return this.httpClients.post<Status>(fullApiUrl, status);
  }

  getById(id: number): Observable<Status> {
    const fullApiUrl = `${environment.serverBaseUrl}/statuses/${id}`;
    return this.httpClients.get<Status>(fullApiUrl);
  }

  update(id: number, status: Status): Observable<Status> {
    const fullApiUrl = `${environment.serverBaseUrl}/statuses/${id}`;
    return this.httpClients.put<Status>(fullApiUrl, status);
  }

  delete(id: number): Observable<{}> {
    const fullApiUrl = `${environment.serverBaseUrl}/statuses/${id}`;
    return this.httpClients.delete(fullApiUrl);
  }
}
