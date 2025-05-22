import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClientDTO {
  id?: number;
  name: string;
  clientTypeName: string; // ex: "PRE_SELLER", etc.
  routeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}

  createClient(client: ClientDTO): Observable<ClientDTO> {
    return this.http.post<ClientDTO>(this.apiUrl, client);
  }

  // autres méthodes (getAll, update, delete) si besoin
}
