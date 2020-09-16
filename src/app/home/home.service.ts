import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {ApiEndPoints, Configuration, Constants} from '../app.constant';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  httpOptions;

  accessToken;

  constructor(
    private http: HttpClient,
    private apiEndPoints: ApiEndPoints,
    private appConstants: Constants,
    private _cookieService: CookieService,
    private configuration: Configuration,
    private authService: AuthService
  ) {

    this.appConstants.accessToken.subscribe(next => {
      this.accessToken = next as string;
      this.httpOptions = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + this.accessToken,
        })
      };
    });
  }

  makeNewLead(email) {
    return this.http.post(this.apiEndPoints.MAKE_NEW_LEAD, email, this.httpOptions);
  }

  getCustomerInfo(data) {
    return this.http.post(this.apiEndPoints.GET_CUSTOMER_INFO, JSON.stringify(data), this.httpOptions);
  }

  updateroofArea(data) {
    return this.http.post(this.apiEndPoints.ROOFTYPE, JSON.stringify(data), this.httpOptions);
  }

  checkAreaLoaction(area) {
    return this.http.post(this.apiEndPoints.CHECK_AREA_LOCATION, area, this.httpOptions);
  }

  updatePriority(data) {
    return this.http.post(this.apiEndPoints.UPDATE_SOLAR_PRIORITY, JSON.stringify(data), this.httpOptions);
  }

  updateContactInformations(data) {
    return this.http.post(this.apiEndPoints.CONTACT_DIALOG, JSON.stringify(data), this.httpOptions);
  }

  uploadExtraInput(data) {
    return this.http.post(this.apiEndPoints.UPLOAD_EXTRA_INPUT, JSON.stringify(data), this.httpOptions);
  }

  uploadYearlyElectric(data) {
    return this.http.post(this.apiEndPoints.UPLOAD_YEARLY_ELECTRIC, JSON.stringify(data), this.httpOptions);
  }

  // uploadElectricId(data) {
  //   return this.http.post(this.apiEndPoints.UPLOAD_ELECTRIC_ID, JSON.stringify(data), this.httpOptions)
  // }

  uploadMannulaArea(data) {
    return this.http.post(this.apiEndPoints.UPLOAD_MANNUAL_AREA, JSON.stringify(data), this.httpOptions);
  }

  getElectricSupplier(data) {
    return this.http.post(this.apiEndPoints.GET_ELECTRIC_SUPPLIER, JSON.stringify(data), this.httpOptions);
  }
  uploadElectricId(data) {
    return this.http.post(this.apiEndPoints.UPLOAD_ELECTRIC_ID, JSON.stringify(data), this.httpOptions)
  }
  public getLanguage() {
    return this._cookieService.get('language');
  }



  public setLanguage(language) {
    this._cookieService.set('language', language);
  }
  public login<T>(username, password): Observable<any> {
    const authorizationData = 'Basic ' + btoa(username + ':' + password);
    this.appConstants.setToken(authorizationData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.apiEndPoints.LOGIN_REQUEST, httpOptions);
  }
}
