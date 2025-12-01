// core/services/http.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private api = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(this.api + url);
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(this.api + url, body);
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(this.api + url, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.api + url);
  }
}
