import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   // clone request and add cookies support
  const modifiedReq = req.clone({
    withCredentials: true
  });

  // send modified request
  return next(modifiedReq);
};
