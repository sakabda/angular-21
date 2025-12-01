import { CommonModule } from '@angular/common';
import { Component, Inject, signal, computed } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';

import { form, Field, required, email } from '@angular/forms/signals';
import { User } from '../../../core/models/user.model';
import { UsersStore } from '../../user/data/users.store';

@Component({
  selector: 'app-add-update-user',
  standalone: true,
  imports: [CommonModule, Field],
  templateUrl: './add-update-user.html',
  styleUrls: ['./add-update-user.scss'],
})
export class AddUpdateUser {
  // -----------------------------------------------------
  // Edit Mode
  // -----------------------------------------------------
  isEdit = signal(false);

  // -----------------------------------------------------
  // User State (Default Values)
  // -----------------------------------------------------
  user = signal({
    // id: 0,
    // avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    // phone: '',
    // role: '',
    // gender: '',
    // birthDate: '',
  });

  // -----------------------------------------------------
  // Signal Form + Validations
  // -----------------------------------------------------
  userForm = form(this.user, (s) => {
    required(s.firstName, { message: 'First name is required' });
    required(s.lastName, { message: 'Last name is required' });

    required(s.email, { message: 'Email is required' });
    email(s.email, { message: 'Invalid email format' });

    // required(s.phone, { message: 'Phone is required' });
    // required(s.role, { message: 'Role is required' });

    // required(s.gender, { message: 'Gender is required' });
    // required(s.birthDate, { message: 'Birth Date is required' });
  });

  // -----------------------------------------------------
  // Errors (computed)
  // -----------------------------------------------------
  error = (field: any) =>
    computed(() => {
      const err = field().errors();
      return err.length ? err[0].message : '';
    });

  firstNameError = this.error(this.userForm.firstName);
  lastNameError = this.error(this.userForm.lastName);
  emailError = this.error(this.userForm.email);
  // phoneError = this.error(this.userForm.phone);
  // roleError = this.error(this.userForm.role);
  // genderError = this.error(this.userForm.gender);
  // birthDateError = this.error(this.userForm.birthDate);

  // -----------------------------------------------------
  // Constructor (Edit Mode Data Patch)
  // -----------------------------------------------------
  constructor(
    private dialogRef: MatDialogRef<AddUpdateUser>,
    @Inject(MAT_DIALOG_DATA) public data: User | null,
    private store: UsersStore
  ) {
    if (data) {
      this.isEdit.set(true);
      this.user.update(() => ({ ...data }));
    }
  }

  // -----------------------------------------------------
  // Save or Update  User
  // -----------------------------------------------------
  save(event: Event) {
    event.preventDefault();

    if (!this.userForm().valid()) {
      Object.values(this.userForm).forEach((x: any) => x?.markAsTouched?.());
      return;
    }

    const payload = this.userForm().value();

    console.log('Saving User:', payload);

    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }
}
