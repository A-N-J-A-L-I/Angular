import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiEndPoints, Constants} from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class HouseEnergyService {
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


  getElectricSupplier(data) {
    return this.http.post(this.apiEndPoints.GET_ELECTRIC_SUPPLIER, JSON.stringify(data), this.httpOptions);
  }
  uploadElectricId(data) {
    return this.http.post(this.apiEndPoints.UPLOAD_ELECTRIC_ID, JSON.stringify(data), this.httpOptions)
  }
}
