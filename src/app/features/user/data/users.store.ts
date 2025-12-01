import { Injectable, signal, computed } from '@angular/core';
import { UsersApi } from './users.api';
import { User } from '../../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  users = signal<any[]>([]);
  loading = signal(false);
  error = signal('');

  limit = signal(10);
  skip = signal(0);
  total = signal(0);

  search = signal('');
  sortField = signal('');
  sortDir = signal<'asc' | 'desc'>('asc');

  constructor(private api: UsersApi) {}

  loadUsers() {
    this.loading.set(true);

    this.api.getUsers(this.limit(), this.skip()).subscribe({
      next: (res) => {
        this.users.set(res.users);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users');
        this.loading.set(false);
      },
    });
  }

  nextPage() {
    if (this.skip() + this.limit() >= this.total()) return;
    this.skip.update((v) => v + this.limit());
    this.loadUsers();
  }

  prevPage() {
    if (this.skip() === 0) return;
    this.skip.update((v) => v - this.limit());
    this.loadUsers();
  }

  setSearch(text: string) {
    this.search.set(text);
  }

  setSorting(field: string) {
    if (this.sortField() === field) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDir.set('asc');
    }
  }

  filteredUsers = computed(() => {
    let data = [...this.users()];

    // Search
    if (this.search()) {
      data = data.filter((u) =>
        (u.firstName + ' ' + u.lastName).toLowerCase().includes(this.search().toLowerCase())
      );
    }

    // Sorting
    if (this.sortField()) {
      const field = this.sortField();
      const dir = this.sortDir();

      data = data.sort((a: any, b: any) => {
        const valA = a[field] ?? '';
        const valB = b[field] ?? '';
        return dir === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
    }

    return data;
  });
  setPage(event: { pageIndex: number; pageSize: number }) {
    this.skip.set(event.pageIndex * event.pageSize);
    this.limit.set(event.pageSize);
    this.loadUsers();
  }
  createUser(data: Partial<User>) {
    return this.api.create(data);
  }

  updateUser(id: number, data: Partial<User>) {
    return this.api.update(id, data);
  }
  deleteUser(id: number) {
    return this.api.delete(id);
  }
}
