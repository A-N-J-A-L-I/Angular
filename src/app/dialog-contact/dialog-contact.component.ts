import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {NgModule} from '@angular/core';
import {Constants} from '../app.constant';
import {HomeService} from "../home/home.service";

@Component({
  selector: 'app-dialog-contact',
  templateUrl: './dialog-contact.component.html',
  styleUrls: ['./dialog-contact.component.scss']
})
export class DialogContactComponent implements OnInit {
  customerInfo;
  customercontact = {
    email: this.appConstants.email,
    customerinfo: {
      companyname: '',
      firstname: '',
      lastname: '',
      // streetaddress: '',
      zip: '',
      city: '',
      country: '',
      phonenumbers: '',
      emailid: '',
      projectaddress: '',
      message: '',
      heatpump: false,
      station: false,
      energymanagment: false,
      allow: false
    }
  };
  onClose: any;
  public twoSideOccupy = false;
  leadId;
disable =  true;
  constructor(public bsModalRef: BsModalRef,
              private toastr: ToastrService,
              private appConstants: Constants,
              private  homeService: HomeService,) {
    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });
  }

  ngOnInit(): void {
    this.getCustomerInfo();
  }



  confirm() {
    if (this.validateRequest()) {
      this.onClose({
        status: 'CONFIRMED',
        data: {
          customercontact: this.customercontact
        }
      });
    }
  }

  getCustomerInfo() {
    this.homeService.getCustomerInfo({
      customercontact:
        {
          email: this.appConstants.email,
          lead_id: this.leadId,
          customerinfo: {check: 'info'}
        }
    }).subscribe(res => {
      const response = res as any;
      this.customerInfo = response;
      console.log(this.customerInfo, 'info')
      this.customercontact.customerinfo.firstname = this.customerInfo.customerinfo.firstname;
      this.customercontact.customerinfo.lastname = this.customerInfo.customerinfo.lastname;
      this.customercontact.customerinfo.zip = this.customerInfo.customerinfo.zip;
      this.customercontact.customerinfo.city = this.customerInfo.customerinfo.city;
      this.customercontact.customerinfo.country = this.customerInfo.customerinfo.country;
      this.customercontact.customerinfo.projectaddress = this.customerInfo.customerinfo.projectaddress;
      this.customercontact.customerinfo.companyname = this.customerInfo.customerinfo.companyname;
      this.customercontact.customerinfo.emailid = this.customerInfo.customerinfo.emailid;
      this.customercontact.customerinfo.allow = this.customerInfo.customerinfo.allow;
      this.customercontact.customerinfo.heatpump = this.customerInfo.customerinfo.heatpump;
      this.customercontact.customerinfo.message = this.customerInfo.customerinfo.message;
      this.customercontact.customerinfo.station = this.customerInfo.customerinfo.station;
      this.customercontact.customerinfo.phonenumbers = this.customerInfo.customerinfo.phonenumbers;
      this.customercontact.customerinfo.energymanagment = this.customerInfo.customerinfo.energymanagment;

    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  check() {
    // tslint:disable-next-line:max-line-length
    if (this.customercontact.customerinfo.firstname && this.customercontact.customerinfo.lastname && this.customercontact.customerinfo.phonenumbers && this.customercontact.customerinfo.emailid && this.customercontact.customerinfo.country && this.customercontact.customerinfo.allow) {
      return false;
    } else {
      return true;

    }
  }

  validateRequest() {
    // tslint:disable-next-line:max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.customercontact.customerinfo.firstname === '') {
      this.toastr.warning('Please enter your First Name');
      return false;
    } else if (this.customercontact.customerinfo.lastname === '') {
      this.toastr.warning('Please enter your Last Name');
      return false;
    } else if (this.customercontact.customerinfo.phonenumbers === '') {
      this.toastr.warning('Please enter your Phone number ');
      return false;
    } else if (this.customercontact.customerinfo.emailid === '') {
      this.toastr.warning('Please enter your Email ');
      return false;
    } else if (this.customercontact.customerinfo.country === '') {
      this.toastr.warning('Please enter your Country');
      return false;
      // tslint:disable-next-line:max-line-length
    } else if (!isNaN(Number(this.customercontact.customerinfo.phonenumbers.trim())) && (this.customercontact.customerinfo.phonenumbers.trim().length > 12 || this.customercontact.customerinfo.phonenumbers.trim().length < 6)) {
      this.toastr.warning('Please enter the valid Phone number');
      return false;
      // tslint:disable-next-line:max-line-length
    } else if (isNaN(Number(this.customercontact.customerinfo.emailid.trim())) && !emailRegex.test(String(this.customercontact.customerinfo.emailid).toLowerCase())) {
      this.toastr.warning('Please enter the valid Email address');
      return false;
    } else {
      return true;
    }
  }


}
