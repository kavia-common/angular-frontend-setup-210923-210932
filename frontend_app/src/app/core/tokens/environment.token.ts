import { InjectionToken } from '@angular/core';

export interface RuntimeEnvironment {
  NG_APP_API_BASE?: string;
  NG_APP_BACKEND_URL?: string;
  NG_APP_FRONTEND_URL?: string;
  NG_APP_WS_URL?: string;
  NG_APP_NODE_ENV?: string;
  NG_APP_NEXT_TELEMETRY_DISABLED?: string;
  NG_APP_ENABLE_SOURCE_MAPS?: string;
  NG_APP_PORT?: string;
  NG_APP_TRUST_PROXY?: string;
  NG_APP_LOG_LEVEL?: string;
  NG_APP_HEALTHCHECK_PATH?: string;
  NG_APP_FEATURE_FLAGS?: string;
  NG_APP_EXPERIMENTS_ENABLED?: string;
}

// PUBLIC_INTERFACE
export const ENVIRONMENT = new InjectionToken<RuntimeEnvironment>('ENVIRONMENT');
