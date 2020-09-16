import {Component, EventEmitter, OnInit, AfterViewInit, Output, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {ResultDataService, ResultService} from '../result.service';
import {ToastrService} from 'ngx-toastr';
import {tap} from 'rxjs/operators';
import {DialogContactComponent} from '../../dialog-contact/dialog-contact.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormDataModel} from '../../home/home.model';
import {HomeService} from '../../home/home.service';
import * as constants from 'constants';
import {Constants} from '../../app.constant';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit , AfterViewInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  season;
  seasonValue;
  directUse;
  leadId;
  toNet;
  toNetWBatt;
  storage = 'wos';
  data;
  battery;
  slides = [
    'Whole-year', 'Spring', 'Summer', 'Autumn', 'Winter'
  ];
  bsModalRef: BsModalRef;
  public model = new FormDataModel();

  constructor(private router: Router,
              private modalService: BsModalService,
              private homeService: HomeService,
              private resultService: ResultService,
              private  toastr: ToastrService,
              private appConstants: Constants,
              private  resultDataService: ResultDataService,
              private  cdRef: ChangeDetectorRef) {
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
    });

    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });
  }

  ngOnInit(): void {
    this.changeSeason();
    this.log(event);
  }


  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }

  public submitForm(): void {
    this.onSubmit.emit({});
  }

  changeUrl() {
    this.router.navigate(['result', 'typicalday']);
  }

  goBack() {
    this.router.navigate(['result', 'independence']);
  }

  changeSeason() {
    if (this.storage === 'wos') {
      this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
      this.directUse = Math.round(this.data?.Output.totalenergy.DirectUse[this.season]);
      this.toNet = Math.round(this.data?.Output.totalenergy.ToNet[this.season]);
      this.battery = 0

    } else {
      this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
      this.directUse = Math.round(this.data?.Output.totalenergy.BatterytoUse[this.season]);
      this.toNet = Math.round(this.data?.Output.totalenergy.ToNetWBatt[this.season]);
      this.battery = Math.round(this.data?.Output.totalenergy.SolartoBattery[this.season]);

    }
  }

  log(event: any) {
    if (this.storage === 'wos') {
      if (event === 0) {
        this.season = 'year';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.DirectUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNet[this.season]);
        this.battery = 0
      } else if (event === 1) {
        this.season = 'spring';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.DirectUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNet[this.season]);
        this.battery = 0

      } else if (event === 2) {
        this.season = 'summer';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.DirectUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNet[this.season]);
        this.battery = 0

      } else if (event === 3) {
        this.season = 'autumn';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.DirectUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNet[this.season]);
        this.battery = 0

      } else if (event === 4) {
        this.season = 'winter';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.DirectUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNet[this.season]);
        this.battery = 0

      }

    } else {
      if (event === 0) {
        this.season = 'year';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.BatterytoUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNetWBatt[this.season]);
        this.battery = Math.round(this.data?.Output.totalenergy.SolartoBattery[this.season]);
      } else if (event === 1) {
        this.season = 'spring';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.SolartoBattery[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.BatterytoUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNetWBatt[this.season]);
        this.battery = Math.round(this.data?.Output.totalenergy.SolartoBattery[this.season]);
      } else if (event === 2) {
        this.season = 'summer';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.BatterytoUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNetWBatt[this.season]);
        this.battery = Math.round(this.data?.Output.totalenergy.SolartoBattery[this.season]);

      } else if (event === 3) {
        this.season = 'autumn';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.BatterytoUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNetWBatt[this.season]);
        this.battery = Math.round(this.data?.Output.totalenergy.SolartoBattery[this.season]);

      } else if (event === 4) {
        this.season = 'winter';
        this.seasonValue = Math.round(this.data?.Output.totalenergy.Solar[this.season]);
        this.directUse = Math.round(this.data?.Output.totalenergy.BatterytoUse[this.season]);
        this.toNet = Math.round(this.data?.Output.totalenergy.ToNetWBatt[this.season]);
        this.battery = Math.round(this.data?.Output.totalenergy.SolartoBattery[this.season]);

      }

    }
  }
  createQuotation() {
    const initialState = {
      title: 'Conatct',
      confirmed: false,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(DialogContactComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose = (myData) => {

      myData.data.customercontact.lead_id = this.leadId;
      console.log(myData.data);
      this.homeService.updateContactInformations(myData.data).subscribe(reply => {
        const response = reply as any;
        this.bsModalRef.hide();
        this.toastr.success('Quotation upload successfully');
      }, error => {
        if (error && error.error && error.error.message) {
          this.toastr.error(error.error.message);
        }
      });
    };

  }

}

