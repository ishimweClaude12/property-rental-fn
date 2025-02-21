import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { RegisterInterface, UserInterface } from '../../models/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  baseUrl = 'https://lala-eiv6.onrender.com/api/v1';

  signUp(user: any): Observable<RegisterInterface> {
    const formData = new FormData();

    // Append each key-value pair from the user object to the FormData
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        if (key === 'avatar' && user[key] instanceof File) {
          // Handle file uploads specifically
          formData.append(key, user[key], user[key].name);
        } else {
          formData.append(key, user[key]);
        }
      }
    }

    return this.http
      .post<RegisterInterface>(`${this.baseUrl}/auth`, formData)
      .pipe(take(1));
  }

  continueWithGoogle() {
    window.location.href = 'https://lala-eiv6.onrender.com/api/v1/auth/google';
  }

  signin(email: string, password: string): Observable<RegisterInterface> {
    return this.http
      .post<RegisterInterface>(`${this.baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(take(1));
  }
}
