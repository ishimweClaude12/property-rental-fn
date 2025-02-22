import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  console.log('Auth interceptor', localStorage.getItem('token'));

  return next(req);
};
