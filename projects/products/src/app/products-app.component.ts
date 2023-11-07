import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'products-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-app.component.html',
  styleUrls: ['./products-app.component.css']
})
export class ProductsAppComponent {
  title = 'products';
}
