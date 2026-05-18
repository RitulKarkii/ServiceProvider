import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CanActivate } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')
  if(token && role === 'admin'){
    return true;
  }else{
    router.navigate(['']);
    return false;
  }

};
