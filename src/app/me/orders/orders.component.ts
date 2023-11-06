import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './orders.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OrdersComponent {
  readonly items = toSignal(inject(OrderService).orders$);
}
