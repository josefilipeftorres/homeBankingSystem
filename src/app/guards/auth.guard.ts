import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const canActivate = !!token; // Returns true if token exists, false otherwise
  console.log('AuthGuard - CanActivate:', canActivate);
  return !!token;
};
