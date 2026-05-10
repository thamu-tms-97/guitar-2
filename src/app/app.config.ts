import { ApplicationConfig, importProvidersFrom, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { routes } from './app.routes';

// Set debug level based on development or production environment
let debugLevel: NgxLoggerLevel;
if (isDevMode()) {
  console.log('Angular is running in development mode with DEBUG level logging');
  debugLevel = NgxLoggerLevel.DEBUG;
} else {
  console.log('Angular is running in production mode with INFO level logging');
  debugLevel = NgxLoggerLevel.INFO;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(
      RouterModule,
      RouterModule.forRoot([]),
      LoggerModule.forRoot({
        level: debugLevel,
        // serverLoggingUrl: '/api/logs',
        serverLogLevel: NgxLoggerLevel.ERROR,
      }),
    ),
  ],
};
