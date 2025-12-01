import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, Field, required, email, minLength } from '@angular/forms/signals';

interface Credentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    Field,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  // 1. Define the initial data model as a signal
  credentials = signal<Credentials>({ email: '', password: '' });
  hidePassword = signal(false);

  // 2. Create the Signal Form with validation
  loginForm = form(this.credentials, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email is not valid' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 6, {
      message: (password) =>
        `Password should have at least 6 characters but has only ${password.value().length}`,
    });
  });

  // Computed error messages for cleaner template
  emailError = computed(() => {
    const errors = this.loginForm.email().errors();
    if (!errors.length) return '';
    return errors[0].message;
  });

  passwordError = computed(() => {
    const errors = this.loginForm.password().errors();
    if (!errors.length) return '';
    return errors[0].message;
  });

  togglePassword() {
    console.log('Toggling password visibility', this.hidePassword());
    this.hidePassword.update((value) => !value);
  }

  onSubmit(event?: Event) {
    event?.preventDefault();

    // Call loginForm() to get FieldState which has valid() method
    if (this.loginForm().valid()) {
      console.log('Login Data:', this.credentials());
      //  Implement your login API call
    } else {
      // Mark individual fields as touched
      this.loginForm.email().markAsTouched();
      this.loginForm.password().markAsTouched();
    }
  }
}
