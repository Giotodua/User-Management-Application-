import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  constructor(
    private httpClients: HttpClient
  ) { }

  getAll(pageIndex?: number, limit?: number): Observable<HttpResponse<Category[]>> {
    const queryParams = `?_page=${pageIndex}&_limit=${limit}`;
    const fullApiUrl = `${environment.serverBaseUrl}/categories${queryParams}`;
    return this.httpClients.get<Category[]>(fullApiUrl, { observe: 'response' });
  }

  create(category: Category): Observable<Category> {
    const fullApiUrl = `${environment.serverBaseUrl}/categories`;
    return this.httpClients.post<Category>(fullApiUrl, category);
  }

  getById(id: number): Observable<Category> {
    const fullApiUrl = `${environment.serverBaseUrl}/categories/${id}`;
    return this.httpClients.get<Category>(fullApiUrl);
  }

  update(id: number, category: Category): Observable<Category> {
    const fullApiUrl = `${environment.serverBaseUrl}/categories/${id}`;
    return this.httpClients.put<Category>(fullApiUrl, category);
  }

  delete(id: number): Observable<{}> {
    const fullApiUrl = `${environment.serverBaseUrl}/categories/${id}`;
    return this.httpClients.delete(fullApiUrl);
  }
}



