import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { authGuardGuard } from '../../../../libs/services/auth-guard.guard';
export const appRoutes: Route[] = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'about',
        component:AboutComponent
    },

    {
        path:'signin',
        loadComponent:()=>
              import("@mono-repo/user/signin").then((m)=>m.UserSigninComponent)
    },{
        path:'signin/profile',
        loadComponent:()=>
        import("@mono-repo/user/profile").then((m)=>m.UserProfileComponent),
       // canActivate: [authGuardGuard]
    },{
        path:'signup',
        loadComponent:()=>
        import("@mono-repo/user/register").then((m)=>m.UserRegisterComponent)
    },{
        path:'signin/courses',
        loadComponent:()=>
        import("@mono-repo/view-component/view-courses").then((m)=>m.ViewComponentViewCoursesComponent),
       // canActivate: [authGuardGuard]
    },{
        path:'signin/schedules',
        loadComponent:()=>
        import("@mono-repo/view-component/view-schedules").then((m)=>m.ViewComponentViewSchedulesComponent),
        //canActivate: [authGuardGuard]
    },
    {
        path:'reset',
        loadComponent:()=>
        import("@mono-repo/password-reset/password-reset").then((m)=>m.PasswordResetPasswordResetComponent)
    }, {
        path:'signin/students',
        loadComponent:()=>
        import("@mono-repo/registered/admin-registered").then((m)=>m.RegisteredAdminRegisteredComponent),
       // canActivate: [authGuardGuard]
    }, {
        path:'signin/registered',
        loadComponent:()=>
        import("@mono-repo/registered/registered").then((m)=>m.RegisteredRegisteredComponent),
       // canActivate: [authGuardGuard]
    }

];

