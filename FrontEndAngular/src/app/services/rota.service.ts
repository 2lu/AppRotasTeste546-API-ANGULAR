import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rota } from "../models/rota";

@Injectable({
  providedIn: 'root'
})
export class RotaService {
  private apiUrl = 'http://localhost:5284/api/Rotas'; // Update this with your API URL

  constructor(private http: HttpClient) { }

  getRotas(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.apiUrl);
  }

  getRota(id: string): Observable<Rota> {
    return this.http.get<Rota>(`${this.apiUrl}/${id}`);
  }

  createRota(rota: Rota): Observable<Rota> {
    return this.http.post<Rota>(this.apiUrl, rota);
  }

  updateRota(id: string, rota: Rota): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, rota);
  }

  deleteRota(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMelhorRota(origem: string, destino: string): Observable<Rota> {
    return this.http.get<Rota>(`${this.apiUrl}/consultar_melhor_rota?origem=${origem}&destino=${destino}`);
  }
}