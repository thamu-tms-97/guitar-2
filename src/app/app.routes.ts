import { Routes } from '@angular/router';

import { Guitar } from './guitar/guitar';
import { Home } from './home/home';
import { ShoppingCart } from './shopping-cart/shopping-cart';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'guitar',
    component: Guitar,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCart,
  },
];
