import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Users } from './users';
import { UsersStore } from '../data/users.store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// -----------------------
// Mock UsersStore
// -----------------------
class MockUsersStore {
  loadUsers = vi.fn();
  createUser = vi.fn().mockReturnValue({
    subscribe: (cb: any) => cb({}),
  });
  updateUser = vi.fn().mockReturnValue({
    subscribe: (cb: any) => cb({}),
  });
  deleteUser = vi.fn().mockReturnValue({
    subscribe: (cb: any) => cb({}),
  });
}

// -----------------------
// Mock MatDialog
// -----------------------
class MockDialog {
  returnValue: any = null;

  open() {
    return {
      afterClosed: () => ({
        subscribe: (fn: any) => fn(this.returnValue),
      }),
    };
  }
}

// -----------------------
// Mock Snackbar
// -----------------------
class MockSnack {
  open = vi.fn();
}

describe('Users Component', () => {
  let component: Users;
  let dialog: MockDialog;
  let snack: MockSnack;
  let store: MockUsersStore;

  beforeEach(async () => {
    dialog = new MockDialog();
    snack = new MockSnack();
    store = new MockUsersStore();

    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [
        { provide: UsersStore, useValue: store },
        { provide: MatDialog, useValue: dialog },
        { provide: MatSnackBar, useValue: snack },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -----------------------------------------
  // openAdd() Testing
  // -----------------------------------------
  // it('should open Add dialog and create user on success', () => {
  //   dialog.returnValue = { firstName: 'John' };

  //   component.openAdd();

  //   expect(store.createUser).toHaveBeenCalled();
  //   expect(snack.open).toHaveBeenCalledWith(
  //     'User created successfully!',
  //     'Close',
  //     expect.any(Object)
  //   );
  // });

  // it('should NOT create user when dialog is closed with no data', () => {
  //   dialog.returnValue = null;

  //   component.openAdd();

  //   expect(store.createUser).not.toHaveBeenCalled();
  // });

  // -----------------------------------------
  // openEdit() Testing
  // -----------------------------------------
  // it('should open Edit dialog and update user on success', () => {
  //   const user = { id: 1, firstName: 'John' };
  //   dialog.returnValue = { firstName: 'Updated' };

  //   component.openEdit(user);

  //   expect(store.updateUser).toHaveBeenCalledWith(1, dialog.returnValue);
  //   expect(snack.open).toHaveBeenCalledWith(
  //     'User updated successfully!',
  //     'Close',
  //     expect.any(Object)
  //   );
  // });

  // it('should NOT update user when dialog returns empty', () => {
  //   const user = { id: 1, firstName: 'John' };
  //   dialog.returnValue = null;

  //   component.openEdit(user);

  //   expect(store.updateUser).not.toHaveBeenCalled();
  // });

  // -----------------------------------------
  // openDelete() Testing
  // -----------------------------------------
  // it('should open delete dialog and delete user on confirm', () => {
  //   const user = { id: 5, firstName: 'Amit' };
  //   dialog.returnValue = true;

  //   component.openDelete(user);

  //   expect(store.deleteUser).toHaveBeenCalledWith(5);
  //   expect(snack.open).toHaveBeenCalled();
  // });

  // it('should NOT delete user when cancelled', () => {
  //   const user = { id: 5, firstName: 'Amit' };
  //   dialog.returnValue = false;

  //   component.openDelete(user);

  //   expect(store.deleteUser).not.toHaveBeenCalled();
  // });

  // -----------------------------------------
  // Snackbar Tests
  // -----------------------------------------
  it('should show success snackbar', () => {
    component.showSuccess();
    expect(snack.open).toHaveBeenCalledWith(
      'User created successfully!',
      'Close',
      expect.any(Object)
    );
  });

  it('should show error snackbar', () => {
    component.showError();
    expect(snack.open).toHaveBeenCalledWith('Something went wrong!', 'Close', expect.any(Object));
  });
});
