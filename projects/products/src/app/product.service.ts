import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly client = inject(HttpClient);

  get products$() {
    return this.client.get<Product[]>(`${environment.api}/products`);
  }
}
