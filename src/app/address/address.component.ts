import {Component, OnInit, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HomeService} from "../home/home.service";
import {Constants} from "../app.constant";
import {FormDataModel} from "../home/home.model";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  options = {
    types: [],
    componentRestrictions: {country: 'CH'}
  };
  lang;
  lat;
  data;
  place = false;
  input = document.getElementsByClassName('pac-item');
  input1 = document.getElementsByClassName('map-search');
  searchLocation;
  accessToken;
  location1;

  constructor(private router: Router,
              private toastr: ToastrService,
              private homeService: HomeService,
              private appConstants: Constants,
              private sanitizer: DomSanitizer,
              private translate: TranslateService,
              private route: ActivatedRoute,) {
    this.appConstants.accessToken.subscribe(value => {
      this.accessToken = value as string;
    });
    this.appConstants.lang = this.route.snapshot.queryParamMap.get('lang');
    this.homeService.setLanguage(this.appConstants.lang);

  }

  ngOnInit() {
    this.login();
    this.convertLanguage();
  }
  convertLanguage() {
    this.translate.setDefaultLang('en');
    if (this.homeService.getLanguage() && this.homeService.getLanguage() !== '') {
      this.translate.use(this.homeService.getLanguage());
    } else {
      this.translate.use('en');
      this.homeService.setLanguage('en');
    }
  }

  public handleAddressChange(address: Address) {
    if (address && address.geometry && address.geometry.location) {
      this.place = false;
      this.lang = address.geometry.location.lng();
      this.lat = address.geometry.location.lat();

      this.location1 = address.formatted_address;
      this.appConstants.setLocation(this.location1);
    }
  }

  homePage() {
    if (this.searchLocation === undefined || this.searchLocation === '') {
      this.toastr.warning('Please write your address');
      return false;
    } else {
      this.router.navigate(['home']);
      // this.searchLocation = this.location1;
      // this.appConstants.setLocation(this.searchLocation);
      return true;
    }
  }


  public location() {
    if (this.input.length === 0) {
      this.place = true;
    } else {
      this.place = false;
    }
    // const add = address.address_components;
    // console.log(add, 'add')
    // for (let comp of add) {
    //   console.log(comp, 'comp')
    //   if (!comp.types || comp.types.length == 0) {
    //     this.place = true
    //   } else {
    //     this.place = false
    //   }
    //
    // }
  }

  login() {
    this.homeService.login('abhinandan.gupta@symbtechnologies.com', 'password').subscribe(response => {
        console.log(response);
        this.appConstants.setToken(response.access_token);
      },
      response => {
        if (response && response.error && response.error.error) {
          this.toastr.error(response.error.error, 'Opps!');
        } else {
          this.toastr.error('Unable to complete your request, please try after sometime.', 'Opps!');
        }
      });
  }


}
