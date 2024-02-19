import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if(localStorage.getItem('token')!==null && localStorage.getItem('userRole') !== 'SuerAdmin')
  {
    return true;
  }
  else 
  {
    _Router.navigate(['/auth/login'])
    return false
  }
  
};