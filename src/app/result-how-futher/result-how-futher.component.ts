import { Component, OnInit } from '@angular/core';
import {DialogContactComponent} from "../dialog-contact/dialog-contact.component";
import {ToastrService} from "ngx-toastr";
import {BsModalService} from "ngx-bootstrap/modal";
import {HomeService} from "../home/home.service";
import {Constants} from "../app.constant";

@Component({
  selector: 'app-result-how-futher',
  templateUrl: './result-how-futher.component.html',
  styleUrls: ['./result-how-futher.component.scss']
})
export class ResultHowFutherComponent implements OnInit {
  leadId;
  bsModalRef;
  constructor(private homeService: HomeService,
              private modalService: BsModalService,
              private  toastr: ToastrService,
              private appConstants: Constants,) {
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
