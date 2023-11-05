import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login.component'),
    },
    {
        path: 'products',
        loadComponent: () => import('./products/listing/listing.component'),
    },
    {
        path: 'me/orders',
        loadComponent: () => import('./me/orders/orders.component'),
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart/cart.component'),
    }

];
