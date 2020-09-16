import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class Configuration {
  public AUTH_SERVER_URL = 'https://authserver-dot-solex-mvp-2.appspot.com';
  // public API_KEY = 'AIzaSyCg935HgBhr0Us6cG1KIDGQr2L-40qR8ss';
  public API_KEY = 'AIzaSyA1uefY3TIXavmMXW0qgHNLn9a8vcE_804';
  public AUTH_SERVER_API_URL = this.AUTH_SERVER_URL;
  public OAUTH_CLIENT_ID = 3;
  public OAUTH_CLIENT_SECRET = 'KQsQ1GO2zEuGOrv5ivOGr2LGywuhSy3Uq1h3Za8N';
  public SERVER_URL = 'https://ecoserve-dot-solex-mvp-2.appspot.com/calc';
  // public SERVER_URL = 'https://https://solcalcmap-dot-solex-mvp-2.appspot.com//calc';

}

@Injectable()
export class Constants {
  public leadId = new BehaviorSubject('');
  public lang = '';
  public email = 'info@lead.com';
  public accessToken = new BehaviorSubject('');
  public searchLocation = new BehaviorSubject('');

  setToken(token) {
    this.accessToken.next(token);
  }

  setLeadId(leadid) {
    this.leadId.next(leadid);
  }
  setLocation(place) {
    this.searchLocation.next(place);
  }

}

@Injectable()
export class ApiEndPoints {

  public MAKE_NEW_LEAD;
  public GET_RESULT;
  public ADD_AREA_LOCATION;
  public ROOFTYPE;
  public UPDATE_SOLAR_PRIORITY;
  public GET_SOLAR_PRIORITY_URL;
  public CONTACT_DIALOG
  public GET_ELECTRIC_SUPPLIER
  public UPLOAD_EXTRA_INPUT;
  public UPLOAD_YEARLY_ELECTRIC;
  public UPLOAD_ELECTRIC_ID;
  public UPLOAD_MANNUAL_AREA;
  public LOGIN_REQUEST;
  public CHECK_AREA_LOCATION;
  public GET_CUSTOMER_INFO;


  constructor(private configuration: Configuration) {
    // Make new lead APIs
    this.MAKE_NEW_LEAD = this.configuration.SERVER_URL + '/leads';

    //  GET_RESULT
    this.GET_RESULT = this.configuration.SERVER_URL + '/get-results';
    // ADD AREA AND LOCATION DETAILS
    this.ADD_AREA_LOCATION = this.configuration.SERVER_URL + '/area-location';

    //  ROOF TYPE API
    this.ROOFTYPE = this.configuration.SERVER_URL + '/rooftype';

    //  Getting the priority items
    this.GET_SOLAR_PRIORITY_URL = this.configuration.SERVER_URL + '/priority';

    //  Updating the priority items
    this.UPDATE_SOLAR_PRIORITY = this.configuration.SERVER_URL + '/priority';

    // Getting the electric supplier
    this.GET_ELECTRIC_SUPPLIER = this.configuration.SERVER_URL + '/elecsupplier';
    //  Contact DIALOG API
    this.CONTACT_DIALOG = this.configuration.SERVER_URL + '/customer-contact';


    // Upload the extra input
    this.UPLOAD_EXTRA_INPUT = this.configuration.SERVER_URL + '/extra-inputs';

    // Upload yearly electric required
    this.UPLOAD_YEARLY_ELECTRIC = this.configuration.SERVER_URL + '/elecsupplier';
    // Upload Electric Id
    this.UPLOAD_ELECTRIC_ID = this.configuration.SERVER_URL + '/elecsupplier';

    // Upload mannual area
    this.UPLOAD_MANNUAL_AREA = this.configuration.SERVER_URL + '/area-location';

    // Check area location
    this.CHECK_AREA_LOCATION = this.configuration.SERVER_URL + '/area-location';

    // Get dyanamic token
    this.LOGIN_REQUEST = this.configuration.AUTH_SERVER_API_URL + '/auth?key=' + this.configuration.API_KEY;

    //Get customer info
    this.GET_CUSTOMER_INFO = this.configuration.SERVER_URL + '/customer-contact';
  }


}



