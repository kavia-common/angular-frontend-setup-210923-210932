import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RuntimeEnvironment } from '../tokens/environment.token';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class EnvService {
  private platformId = inject(PLATFORM_ID);

  /** SSR-safe access to window.__env */
  // PUBLIC_INTERFACE
  getEnv(): RuntimeEnvironment {
    const isBrowser = isPlatformBrowser(this.platformId);
    const w = isBrowser ? (globalThis as any) : undefined;
    const env = (w && w.window && w.window.__env) || {};
    return { ...env };
  }

  // PUBLIC_INTERFACE
  getString(key: keyof RuntimeEnvironment, fallback: string | undefined = undefined): string | undefined {
    const env = this.getEnv();
    const raw = env[key];
    return typeof raw === 'string' && raw.length ? raw : fallback;
  }

  // PUBLIC_INTERFACE
  getBoolean(key: keyof RuntimeEnvironment, fallback = false): boolean {
    const v = this.getString(key);
    if (v == null) return fallback;
    return ['1', 'true', 'yes', 'on'].includes(String(v).toLowerCase());
  }
}
