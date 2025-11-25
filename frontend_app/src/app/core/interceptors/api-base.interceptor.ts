import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EnvService } from '../services/env.service';

// PUBLIC_INTERFACE
export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  const env = inject(EnvService);
  const base = env.getString('NG_APP_API_BASE', '') || '';
  const isRelative = !/^https?:\/\//i.test(req.url);
  if (base && isRelative) {
    const joined = `${base.replace(/\/+$/, '')}/${req.url.replace(/^\/+/, '')}`;
    req = req.clone({ url: joined });
  }
  return next(req);
};
