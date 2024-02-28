import { CanActivateFn,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthserviceService } from '../user/services/authservice.service';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{
    const injector = Injector.create({ providers: [{ provide: AuthserviceService, useClass: AuthserviceService }] });

    const authService = injector.get(AuthserviceService);
    return authService.isLoggedIn();
}





