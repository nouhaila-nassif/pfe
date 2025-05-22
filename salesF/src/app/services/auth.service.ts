import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private roles = new BehaviorSubject<string[]>(this.extractRoles());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  signup(data: { username: string; password: string; roles: string[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data, { responseType: 'text' });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
    this.roles.next(this.extractRoles());
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.roles.next([]);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getLoggedInObservable() {
    return this.loggedIn.asObservable();
  }

  getRoles(): string[] {
    return this.roles.value;
  }

  getRolesObservable() {
    return this.roles.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private extractRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      // Selon le format de ton token, ça peut être 'roles' ou 'role' ou autre
      return decoded.roles || [];
    } catch (error) {
      console.error('Erreur décodage token JWT:', error);
      return [];
    }
  }
}
