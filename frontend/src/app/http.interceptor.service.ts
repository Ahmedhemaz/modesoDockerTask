import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class HttpInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(this.setAuthorizationHeader(req)).pipe(
            map( response => {
                return response;
            })
        );
    }


    private setAuthorizationHeader(requset: HttpRequest<any>) {
        if (!this.isUserLoggedIn) {
            const modifiedRequest = requset.clone({
                headers: requset.headers.set('Authorization', ` Bearer ${JSON.parse(localStorage.getItem('user')).token}`)
            });
            return modifiedRequest;
        }
        return requset;

    }

    private isUserLoggedIn(): boolean {
        return localStorage.getItem('user') === null ? false  : true;
    }
}
