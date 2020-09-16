import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiEndPoints, Constants} from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class HousePriorityService {
  httpOptions;

  accessToken;

  constructor(
    private http: HttpClient,
    private apiEndPoints: ApiEndPoints,
    private appConstants: Constants
  ) {
    this.appConstants.accessToken.subscribe(next => {
      this.accessToken = next as string;
      this.httpOptions = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.accessToken,
        })
      };
    });
  }

  getPriorityListItems(leadId) {
    return this.http.post(this.apiEndPoints.GET_SOLAR_PRIORITY_URL, JSON.stringify({
      email: this.appConstants.email,
      lead_id: leadId,
      prioritylist: 'getlist'
    }), this.httpOptions);
  }

}
