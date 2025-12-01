// features/users/data/users.api.ts
import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersApi {
  constructor(private http: HttpService) {}

  getUsers(limit = 10, skip = 0): Observable<any> {
    return this.http.get(`/users?limit=${limit}&skip=${skip}`);
  }

  create(data: Partial<User>) {
    return this.http.post<User>('/users/add', data);
  }

  update(id: number, data: Partial<User>) {
    return this.http.put<User>(`/users/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
