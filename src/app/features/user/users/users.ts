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
  constructor(public store: UsersStore, private dialog: MatDialog) {}
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
      console.log('add dialog closed with result:', result);

      if (result) {
        this.store.createUser(result).subscribe(() => {
          this.store.loadUsers(); // refresh table data
        });
      }
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
      console.log('Edit dialog closed with result:', res);
      if (res) {
        this.store.updateUser(user.id, res).subscribe(() => {
          this.store.loadUsers();
        });
      }
    });
  }

  openDelete(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '360px',
      disableClose: true,
      data: { name: user.firstName },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.deleteUser(user.id).subscribe(() => {
          this.store.loadUsers();
        });
      }
    });
  }
}
