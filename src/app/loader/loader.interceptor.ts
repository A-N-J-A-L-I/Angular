import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  counter: number;


  constructor(private loader: NgxSpinnerService) {
    this.counter = 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Showing Loader');

    this.loader.show();
    this.counter++;

    return next.handle(req).pipe(
      finalize(() => {
        this.counter--;
        if (this.counter === 0) {
          console.log('Hiding Loader');
          this.loader.hide();
        }
      }),
    );
  }
}

