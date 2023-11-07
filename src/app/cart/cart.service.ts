import { Injectable, inject } from '@angular/core';
import { Product } from '../../../projects/products/src/app/models';
import { NotifierService } from '../notifications/notifier.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _notifier = inject(NotifierService)
  private readonly _items = new BehaviorSubject<Product[]>([]);

  get items$() {
    return this._items.asObservable();
  }

  get itemsCount$() {
    return this._items.asObservable().pipe(
      map(items => items.length)
    );
  }

  addToCart(item: Product) {
    this._items.next([...this._items.value, item]);
    this._notifier.notify(`Product ${item.name} added to cart`);
  }

  clear() {
    this._items.next([]);
  }
}
