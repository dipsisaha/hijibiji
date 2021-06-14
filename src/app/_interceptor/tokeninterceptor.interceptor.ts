import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ApplicationConstants } from '../app.constants'
import { CommonService } from '../_services/common.service';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
   constructor( private router: Router, private commonService: CommonService ,private authService: AuthenticationService) { }
   intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
   	   if(sessionStorage.getItem("token")){
			request = request.clone( {
	            setHeaders: {
	                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("token"))
	            }
	        } );
		}
        return next.handle( request ).do(( event: HttpEvent<any> ) => {
            if ( event instanceof HttpResponse ) {
                // do stuff with response if you want
            }
        }, ( err: any ) => {
            if ( err instanceof HttpErrorResponse ) {
                if ( err.status === 401 ) {//token has expired or is not valid, thus relogin
                     this.commonService.logout();
                }
            }
         } );
    }
}