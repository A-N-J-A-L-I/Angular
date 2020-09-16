import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiEndPoints, Constants} from '../app.constant';
import {BehaviorSubject} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ResultService {
  httpOptions;
  data;
  accessToken;
  leadId;
  constructor(private http: HttpClient,
              private apiEndPoints: ApiEndPoints,
              private appConstants: Constants) {
    this.appConstants.accessToken.subscribe(value => {
      this.accessToken = value as string;
    });
    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string
    });

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer ' + this.accessToken
      }),
      reportProgress: true
    };
  }


  getResult() {
    return this.http.post(this.apiEndPoints.GET_RESULT, JSON.stringify({
      email: 'info@lead.com',
      lead_id: this.leadId,
      // lead_id: '138689bc-887e-11ea-b46b-0242ac110006',
    }), this.httpOptions);
  }

}


@Injectable({
  providedIn: 'root'
})
export class ResultDataService {
  data;
  temp: BehaviorSubject<any>;
  result;

  constructor() {
    this.data = null;
    this.temp = new BehaviorSubject(this.data);
    this.result = this.temp.asObservable();
  }


  setResult(data) {
    this.temp.next(data);
  }

}
