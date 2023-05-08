import { Injectable } from '@angular/core';
import { Route, Router, CanLoad, CanActivate, CanDeactivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


const suggestedSiteStorage = 'suggestedSite';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private router: Router, private route: ActivatedRoute) { }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkIfLogin(route.path);
    }
    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        return this.checkIfActivate(route, state);
    }

    // CanDeactivate(component: T, route) {
    //     return this.checkIfDeactivate(route.path);
    // }

    checkIfLogin(path: any){
        let token = localStorage.getItem('token');
        if(token){
            this.router.navigateByUrl('book');
            return false;
        }else{
            this.router.navigateByUrl('/');
            
        return true;
        }
    }

    checkIfActivate(route: any, state: any){
        // console.log(route)
        // console.log(state)
        // console.log(this.route)
        // console.log(this.router)
        
        let token = localStorage.getItem('token');
        if(state.url === '/login'){
            if(token ){
                this.router.navigateByUrl('book');
                return false;
            }else{
                return true;
            }
        }
        if(token){
            return true;
        }else{
            this.router.navigateByUrl('/');
            
        return false;
        }
    }
}
