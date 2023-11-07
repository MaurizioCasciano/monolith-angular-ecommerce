import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {ProductService} from "./product.service";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
      MatSnackBarModule
    ])
  ]
};
