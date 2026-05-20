import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { ServiceRegiseter } from './service-regiseter/service-regiseter';
import { Home } from './home/home';
import { authGuard } from './auth-guard';
import { Booking } from './booking/booking';
import { Payment } from './payment/payment';
import { Cart } from './cart/cart';
import { Order } from './order/order';
import { ServiceExplore } from './service-explore/service-explore';

export const routes: Routes = [
    { path : 'register', component: Register},
    { path : 'login', component: Login},
    { path : 'dashboard', component: Dashboard , canActivate: [authGuard]},
    { path : 'service', component:ServiceRegiseter, canActivate: [authGuard]},
    { path : '', component:Home},
    { path : 'booking',component:Booking},
    { path : 'payment',component:Payment},
    { path: 'cart',component:Cart},
    { path : 'order',component:Order},
    { path : 'explore',component:ServiceExplore}

];
