import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface HealthResponse {
  status: string;
  uptime?: number;
  timestamp?: string | number;
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class HealthService {
  private http = inject(HttpClient);
  private env = inject(EnvService);

  // PUBLIC_INTERFACE
  ping(): Observable<HealthResponse | null> {
    const apiBase = this.env.getString('NG_APP_API_BASE', '');
    const healthPath = this.env.getString('NG_APP_HEALTHCHECK_PATH', '');
    if (!apiBase || !healthPath) {
      // Missing config: return null observable gracefully
      return of(null);
    }
    const url = `${apiBase.replace(/\/+$/, '')}/${healthPath.replace(/^\/+/, '')}`;
    return this.http.get<HealthResponse>(url).pipe(
      catchError(() => of({ status: 'unreachable' }))
    );
  }
}
