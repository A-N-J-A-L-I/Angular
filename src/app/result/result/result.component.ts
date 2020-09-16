import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import {ResultDataService, ResultService} from "../result.service";
import {ToastrService} from "ngx-toastr";
import {DialogContactComponent} from "../../dialog-contact/dialog-contact.component";
import {HomeService} from "../../home/home.service";
import {FormDataModel} from "../../home/home.model";
import {Constants} from "../../app.constant";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorComponent} from "../components/error/error.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  showResults = false;
  bsModalRef: BsModalRef;
  errorModalRef: BsModalRef;
  data;
  leadId;
  public model = new FormDataModel();

  constructor(private modalService: BsModalService,
              private  resultService: ResultService,
              private router: Router,
              private loader: NgxSpinnerService,
              private homeService: HomeService,
              private  toastr: ToastrService,
              private resultDataService: ResultDataService,
              private appConstants: Constants,
              private route: ActivatedRoute,
              private translate: TranslateService,) {
    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });
    // this.appConstants.lang = this.route.snapshot.queryParamMap.get('lang');
    // this.homeService.setLanguage(this.appConstants.lang);
  }

  ngOnInit(): void {
    // this.getResult();
    this.convertLanguage();
    this.resultloader();
  }
resultloader(): void {
    this.loader.hide('result-loader');
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

  createQuotation() {
    const initialState = {
      title: 'Conatct',
      confirmed: false,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(DialogContactComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose = (myData) => {
      console.log(myData.data);
      myData.data.customercontact.lead_id = this.leadId;
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
  //
  // getResult() {
  //   this.resultService.getResult().subscribe(res => {
  //     this.data = res as any;
  //     if (this.data.status) {
  //       this.showResults = true;
  //
  //     }
  //     this.resultDataService.setResult(this.data);
  //   }, error => {
  //     this.showResults = false;
  //     this.errorModalRef = this.modalService.show(ErrorComponent, {
  //       class: 'modal-xl modal-dialog-centered',
  //       // backdrop: false,
  //       ignoreBackdropClick: true
  //     });
  //
  //     this.errorModalRef.content.onClose = () => {
  //       const initialState = {
  //         title: 'Conatct',
  //         confirmed: false,
  //         class: 'modal-lg'
  //       };
  //
  //       this.router.navigate(['/']);
  //       // this.bsModalRef = this.modalService.show(DialogContactComponent, initialState);
  //       // this.bsModalRef.content.closeBtnName = 'Close';
  //       // this.bsModalRef.content.onClose = (myData) => {
  //       //   myData.data.customercontact.lead_id = this.leadId;
  //       //   this.homeService.updateContactInformations(myData.data).subscribe(reply => {
  //       //     const response = reply as any;
  //       //     this.bsModalRef.hide();
  //       //   }, error => {
  //       //     if (error && error.error && error.error.message) {
  //       //       this.toastr.error(error.error.message);
  //       //     }
  //       //   });
  //       // };
  //       this.errorModalRef.hide();
  //     };
  //   });
  // }


}
