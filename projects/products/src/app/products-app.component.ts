import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import ListingComponent from "./listing/listing.component";

@Component({
  selector: 'products-root',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './products-app.component.html',
  styleUrls: ['./products-app.component.css']
})
export class ProductsAppComponent {
  title = 'products';
}
