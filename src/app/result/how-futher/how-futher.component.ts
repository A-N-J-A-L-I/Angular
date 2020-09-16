import { Component, OnInit } from '@angular/core';

import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from "@angular/router";
import {DialogContactComponent} from "../../dialog-contact/dialog-contact.component";
import {HomeService} from "../../home/home.service";
import {ToastrService} from "ngx-toastr";

import {FormDataModel} from "../../home/home.model";
import {Constants} from "../../app.constant";

@Component({
  selector: 'app-how-futher',
  templateUrl: './how-futher.component.html',
  styleUrls: ['./how-futher.component.scss']
})
export class HowFutherComponent implements OnInit {
  bsModalRef: BsModalRef;
  leadId;
  public model = new FormDataModel();
  constructor(private modalService: BsModalService,
              private router: Router,
              private  appConstants: Constants,
              private homeService: HomeService,
              private  toastr: ToastrService,) {
    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });

  }

  ngOnInit(): void {
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
  goBack() {
    this.router.navigate(['result', 'sustain']);
  }
}
