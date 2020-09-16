import {Component, OnInit} from '@angular/core';
import {HomeService} from "../home/home.service";
import {TranslateService} from "@ngx-translate/core";
import {DialogContactComponent} from "../dialog-contact/dialog-contact.component";
import {Constants} from "../app.constant";
import {BsModalService} from "ngx-bootstrap/modal";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-result',
  templateUrl: './new-result.component.html',
  styleUrls: ['./new-result.component.scss']
})
export class NewResultComponent implements OnInit {
  resultStep = [];
activeStep = '';
  active ;
  leadId;
  bsModalRef;
  isVisible = true;
  constructor(private homeService: HomeService,
              private translate: TranslateService,
              private appConstants: Constants,
              private modalService: BsModalService,
              private  toastr: ToastrService,) {
    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });
    this.resultStep.push('independence');
    this.resultStep.push('consumption');
    this.resultStep.push('typicalDay');
    this.resultStep.push('financial');
    this.resultStep.push('sustain');
    this.resultStep.push('howFuther');
    this.activeStep = 'independence';
  }

  ngOnInit(): void {
    this.convertLanguage();
    document.body.style.background = '#E5E9EC';
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
  stepChange(step) {
    console.log('tabopen-->', step )
    this.resultStep.forEach((item) => {
      if (item === step) {
        this.activeStep = step;
      }
    });
    if ( step === 'howFuther') {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }
  next(step) {
    if (step === 'independence') {
      this.activeStep = 'consumption';
      this.isVisible = true;
    } else if (step === 'consumption') {
    this.activeStep = 'typicalDay';
      this.isVisible = true;
  } else if (step === 'typicalDay') {
    this.activeStep = 'financial';
      this.isVisible = true;
  }  else if (step === 'financial') {
      this.activeStep = 'sustain';
      this.isVisible = true;
    } else if (step === 'sustain') {
    this.activeStep = 'howFuther';
      this.isVisible = false;
  } else if (step === 'howFuther') {
      this.isVisible = true;
  } else {
      this.isVisible = true;
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
        this.toastr.warning('Contact Information not updated Please try again', 'Oops');
      });
    };

  }

}
