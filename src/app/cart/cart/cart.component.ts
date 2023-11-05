import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { OrderService } from 'src/app/me/orders/order.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CartComponent {
  private readonly _cart = inject(CartService);
  private readonly _order = inject(OrderService);

  readonly items = toSignal(this._cart.items$);

  readonly total = computed(() => {
    return this.items()!.reduce((acc, item) => acc + item.price, 0);
  })

  createOrder() {
    this._order.create(this.items()!).subscribe(() => {
      this._cart.clear();
    });
  }
}
