import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ProductsAppComponent } from './app/products-app.component';

bootstrapApplication(ProductsAppComponent, appConfig)
  .catch((err) => console.error(err));
