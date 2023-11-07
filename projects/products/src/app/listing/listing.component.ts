import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../models';

@Component({
  selector: 'products-listing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './listing.component.html',
  styles: [
    `
    .items {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 33vw;
        margin: 1rem;
      }
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListingComponent {
  private readonly _cart = inject(CartService);
  readonly items = toSignal(inject(ProductService).products$)

  addToCart(item: Product) {
    this._cart.addToCart(item);
  }
}
