import { Component, OnInit } from '@angular/core';
import {DialogContactComponent} from "../../dialog-contact/dialog-contact.component";
import {Constants} from "../../app.constant";
import {ToastrService} from "ngx-toastr";
import {HomeService} from "../../home/home.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {ResultDataService} from "../result.service";

@Component({
  selector: 'app-sustainability',
  templateUrl: './sustainability.component.html',
  styleUrls: ['./sustainability.component.scss']
})
export class SustainabilityComponent implements OnInit {
storage = 'PV-without-storage';
  bsModalRef;
  leadId;
  data;
  trees;
  autoKM;
  co2;
  constructor(private router: Router,
              private modalService: BsModalService,
              private homeService: HomeService,
              private  toastr: ToastrService,
              private appConstants: Constants,
              private resultDataService: ResultDataService,) {
    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
    });
  }

  ngOnInit(): void {
    this.changeStorage();
  }
  changeUrl() {
    this.router.navigate(['result', 'how-futher']);
  }
  goBack() {
    this.router.navigate(['result', 'economic']);
  }

  changeStorage() {
    if (this.storage === 'PV-without-storage') {
      this.co2 = Math.round(this.data?.Output.CO2redpercentt);
      this.autoKM = Math.round(this.data?.Output.Autokm);
      this.trees = Math.round(this.data?.Output.trees);

    } else {
      this.co2 = Math.round(this.data?.Output.CO2redpercentt);
      this.autoKM = Math.round(this.data?.Output.Autokm);
      this.trees = Math.round(this.data?.Output.tress);

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
