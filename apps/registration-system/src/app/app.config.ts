import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../../../../libs/services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi:true,
  }],
};
