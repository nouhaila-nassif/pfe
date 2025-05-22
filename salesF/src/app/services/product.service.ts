import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Product {
  id?: number;
  name: string;
  price: number;
  description?: string;  // Ajout de description, optionnel ou obligatoire selon besoin

  // ajouter d'autres champs selon besoin
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

 createProduct(product: Product): Observable<Product> {
  const token = localStorage.getItem('token'); // récupère ton token

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // ajoute le token dans le header
    'Content-Type': 'application/json'
  });

  return this.http.post<Product>(`${this.apiUrl}/create`, product, { headers });
}

 updateProduct(id: number, product: Product): Observable<Product> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers });
}

deleteProduct(id: number): Observable<void> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
}

}
