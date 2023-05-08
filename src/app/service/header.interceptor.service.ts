import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoaderService } from "./loader.service";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
	token: any = '';
    jwtHelperService = new JwtHelperService();
	activeRequests = 0;
	constructor(private _loaderService: LoaderService){

	}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authorizationToken = localStorage.getItem('token');
		this.token = this.jwtHelperService.decodeToken(authorizationToken);
		this.manageLoader();
		if (req.headers.get("skip") || !authorizationToken){
			return this.handle(next, req);
		   }else{
			req = req.clone({
			setHeaders: {
				'Authorization': `Bearer ${authorizationToken}`
			}
		})
		}
		return this.handle(next, req);
    }

	handle(next, req){
		return next.handle(req).pipe(
			finalize(() => {
				this.stopLoader();
			}),
			catchError((err: HttpErrorResponse)=>{
				this.stopLoader();
				console.log(err);
				return throwError(err);
			})
		)
		// return next.handle(req).pipe((event: HttpEvent<any>) => {
        //     if (event instanceof HttpResponse) {
        //         this.stopLoader();
				
        //     }
		// 	return event;
        // }, (err: any) => {
        //     if (err instanceof HttpErrorResponse) {
        //         this.stopLoader();
		// 		console.log(err);
		// 		// return throwError(err);
        //     }
		// 	return throwError(err);
        // })
	}
	stopLoader() {
		this.activeRequests--;
		if(this.activeRequests === 0){
			this._loaderService.triggerLoader(false);
		}
	}
	manageLoader() {
		if(this.activeRequests === 0){
			this._loaderService.triggerLoader(true);
		}
		this.activeRequests++;
	}
}