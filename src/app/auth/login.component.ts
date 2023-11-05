import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatButtonModule } from '@angular/material/button';
import { NotifierService } from '../notifications/notifier.service';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  template: `
    <form (submit)="submit()" [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>E-mail</mat-label>
        <input type="email" matInput placeholder="Your e-mail" formControlName="email">
        <mat-icon matSuffix>email</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Password</mat-label>
        <input type="password" matInput placeholder="Your password" formControlName="password">
        <mat-icon matSuffix>password</mat-icon>
        
      </mat-form-field>

      <button mat-raised-button color="primary" [disabled]="form.invalid || posting()">Login</button>
    </form>
  `,
  styles: [
    `
    form {
      display: flex;
      flex-direction: column;
      padding: 0 10vw;
    } 
    `
  ]
})
export default class LoginComponent {
  readonly posting = signal(false);

  readonly form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  })

  private readonly _auth = inject(AuthService);
  private readonly _notifier = inject(NotifierService);
  private readonly _router = inject(Router);

  submit() {
    this.posting.set(true);
    const { email, password } = this.form.getRawValue();
    this._auth.login(email, password).pipe(
      finalize(() =>
        this.posting.set(false))
    ).subscribe((success) => {
      if (!success) {
        this._notifier.notify('Invalid credentials');
        return
      }

      this._router.navigate(['/']);
    });
  }
}
