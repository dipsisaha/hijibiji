import { Routes } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApplicationConstants } from './app.constants'
import { NavigationGuard} from './_guard/navigation.guard' 

export const AppRoutes:Routes = [
    { path :'',component : HomeComponent,data:{org:'',title: "home"}},
    { path : 'home',component :HomeComponent,data:{org:'',title: "home"}}, 
    { path : '**',component : HomeComponent,data:{org:'',title: "home Login"}},
];