import { Routes } from '@angular/router';

import { Guitar } from './guitar/guitar';
import { Home } from './home/home';
import { OrderPlaced } from './order-placed/order-placed';
import { Picks } from './picks/picks';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { Straps } from './straps/straps';
import { Strings } from './strings/strings';

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
    path: 'pick',
    component: Picks,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCart,
  },
  {
    path: 'strap',
    component: Straps,
  },
  {
    path: 'strings',
    component: Strings,
  },
  {
    path: 'order-placed',
    component: OrderPlaced,
  },
];
