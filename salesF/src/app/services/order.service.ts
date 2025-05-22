import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/orders';

export interface Order {
  id?: number;
  product: string;
  quantity: number;
  price: number;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<any> {
    return this.http.post(API_URL, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${API_URL}/${id}`);
  }

  updateOrder(id: number, order: Order): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, order);
  }

  cancelOrder(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
