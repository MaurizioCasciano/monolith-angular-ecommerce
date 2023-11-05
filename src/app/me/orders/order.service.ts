import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './models';
import { Product } from 'src/app/products/models';
import { NotifierService } from 'src/app/notifications/notifier.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly client = inject(HttpClient);
  private readonly notifier = inject(NotifierService);

  get orders$() {
    const userId = window.localStorage.getItem('userId');
    return this.client.get<Order[]>(`${environment.api}/orders?userId=${userId}&_sort=createdAt&_order=desc`);
  }

  create(products: Product[]) {
    const order: Partial<Order> = {
      userId: parseInt(window.localStorage.getItem('userId')!),
      price: products.reduce((acc, item) => acc + item.price, 0),
      status: 'processing',
      createdAt: new Date()
    };
    return this.client.post(`${environment.api}/orders`, order).pipe(tap(() => {
      this.notifier.notify('Order created');
    }));
  }
}
