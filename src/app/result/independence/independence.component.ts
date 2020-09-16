import {Component, EventEmitter, OnInit, AfterViewInit, Output, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {ResultDataService, ResultService} from "../result.service";
import {ToastrService} from "ngx-toastr";
import {$} from "protractor";
import {tap} from "rxjs/operators";
import {DialogContactComponent} from "../../dialog-contact/dialog-contact.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormDataModel} from "../../home/home.model";
import {HomeService} from "../../home/home.service";
import {Constants} from "../../app.constant";

@Component({
  selector: 'app-independence',
  templateUrl: './independence.component.html',
  styleUrls: ['./independence.component.scss']
})
export class IndependenceComponent implements OnInit , AfterViewInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  season;
  pv = {
    wos: 'abc',
    ws: 'xyz'
  }

  storage = 'PV-without-storage';
leadId;
  data;
  angle = 0;
  max = '100';
  slides = [
    'Whole-year', 'Spring', 'Summer', 'Autumn', 'Winter'
  ];
  bsModalRef: BsModalRef;
  public model = new FormDataModel();

  constructor(private router: Router,
              private resultService: ResultService,
              private  toastr: ToastrService,
              private  resultDataService: ResultDataService,
              private  cdRef: ChangeDetectorRef,
              private modalService: BsModalService,
              private homeService: HomeService,
              private appConstants: Constants) {
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
    this.router.navigate(['result', 'consumption']);
  }


  changeSeason() {
    if (this.storage === 'PV-without-storage') {
      this.angle = Math.round(this.data?.Output.independance[this.season]);
    } else {
      this.angle = Math.round(this.data?.Output.independanceWbatt[this.season]);
    }
  }

  log(event: any) {
    if (this.storage === 'PV-without-storage') {
      if (event === 0) {
        this.season = 'year';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 1) {
        this.season = 'spring';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 2) {
        this.season = 'summer';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 3) {
        this.season = 'autumn';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 4) {
        this.season = 'winter';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      }
    } else {
      if (event === 0) {
        this.season = 'year';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 1) {
        this.season = 'spring';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 2) {
        this.season = 'summer';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 3) {
        this.season = 'autumn';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
      } else if (event === 4) {
        this.season = 'winter';
        this.angle = Math.round(this.data?.Output.independance[this.season]);
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
      console.log(myData.data)
      myData.data.customercontact.lead_id  = this.leadId;
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
