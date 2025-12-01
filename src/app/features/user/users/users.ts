import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersStore } from '../data/users.store';
import { AddUpdateUser } from '../add-update-user/add-update-user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class Users {
  displayedColumns = ['avatar', 'name', 'email', 'gender', 'birth', 'actions'];

  getInitials(user: any) {
    return user.firstName + user.lastName;
  }
  constructor(public store: UsersStore, private dialog: MatDialog, private snack: MatSnackBar) {}
  ngOnInit() {
    console.log('Users component initialized');
    this.store.loadUsers();
  }
  openAdd() {
    const dialogRef = this.dialog.open(AddUpdateUser, {
      width: '620px',
      disableClose: true,
      panelClass: 'dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

      this.store.createUser(result).subscribe({
        next: () => {
          this.store.loadUsers();
          this.snack.open('User created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
        },
        error: (err) => {
          console.error('API Error:', err);

          // When API returns a known message (e.g. user exists)
          if (err?.error?.message) {
            this.snack.open(err.error.message, 'Close', {
              duration: 4000,
              panelClass: ['snack-error'],
            });
            return;
          }

          // When server completely fails (500, network error, etc.)
          this.snack.open('Something went wrong! Please try again.', 'Close', {
            duration: 4000,
            panelClass: ['snack-error'],
          });
        },
      });
    });
  }

  openEdit(user: any) {
    const dialogRef = this.dialog.open(AddUpdateUser, {
      width: '420px',
      disableClose: true,
      panelClass: 'dialog-panel',
      data: user,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) return;

      this.store.updateUser(user.id, res).subscribe({
        next: () => {
          this.store.loadUsers();
          this.snack.open('User updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
        },
        error: (err) => {
          console.error('Update API Error:', err);

          if (err?.error?.message) {
            this.snack.open(err.error.message, 'Close', {
              duration: 4000,
              panelClass: ['snack-error'],
            });
            return;
          }

          this.snack.open('Something went wrong! Please try again.', 'Close', {
            duration: 4000,
            panelClass: ['snack-error'],
          });
        },
      });
    });
  }

  openDelete(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '360px',
      disableClose: true,
      data: { name: user.firstName },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.store.deleteUser(user.id).subscribe({
        next: () => {
          this.store.loadUsers();
          this.snack.open('User deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
        },
        error: (err) => {
          console.error('Delete API Error:', err);

          if (err?.error?.message) {
            this.snack.open(err.error.message, 'Close', {
              duration: 4000,
              panelClass: ['snack-error'],
            });
            return;
          }

          this.snack.open('Failed to delete user! Please try again.', 'Close', {
            duration: 4000,
            panelClass: ['snack-error'],
          });
        },
      });
    });
  }

  showSuccess() {
    this.snack.open('User created successfully!', 'Close', {
      duration: 3000,
      panelClass: ['snack-success'],
    });
  }
  showError() {
    this.snack.open('Something went wrong!', 'Close', {
      duration: 3000,
      panelClass: ['snack-error'],
    });
  }
}
