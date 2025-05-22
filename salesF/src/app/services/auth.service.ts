import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  

  signup(data: { username: string; password: string; roles: string[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data, { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles || [];  // récupère les rôles, ou tableau vide si absent
    } catch (error) {
      console.error('Erreur décodage token JWT:', error);
      return [];
    }
  }




}


