import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url="http://localhost:5000/api/product";

  constructor(private http:HttpClient) { }

  getProducts():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url);
  }
}
