import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import {Constants} from '../app.constant';
import {AuthService} from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
accessToken
  constructor(private appConstants: Constants, private authService: AuthService) {
    this.appConstants.accessToken.subscribe(value => {
      this.accessToken = value as string;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedRequest;
    modifiedRequest = request.clone({
      setHeaders: {
        Authorization: this.accessToken
      }
    });

    return next.handle(modifiedRequest);
  }

}
