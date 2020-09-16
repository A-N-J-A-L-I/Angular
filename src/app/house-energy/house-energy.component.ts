import {Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges} from '@angular/core';
import {HouseEnergyService} from './house-energy.service';
import {Constants} from '../app.constant';
import {HomeService} from "../home/home.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-house-energy',
  templateUrl: './house-energy.component.html',
  styleUrls: ['./house-energy.component.scss']
})
export class HouseEnergyComponent implements OnInit, OnChanges {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() leadId: string;
  @Input() yearly: string;
  data;
  electrics;
  electricId;
  edit=0;
  electricsupplier;

  constructor(
    private houseEnergy: HouseEnergyService,
    private appConstants: Constants,
    private homeService: HomeService,
    private  toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.electrics = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.leadId && this.leadId !== '' && this.yearly && this.yearly !== '') {
      this.getElectricSupplier();
    }
  }

  public submitForm(): void {
    this.onSubmit.emit({
    value: this.electricId
    });
  }
  getElectricSupplier() {
    this.houseEnergy.getElectricSupplier({
      email: this.appConstants.email,
      lead_id: this.leadId,
      action: 'getsupplierdata'
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      this.electrics = this.data.ListofSuppliers;
      this.electricId = this.data.ListofSuppliers[0].elecID;
      this.uploadElectricId()
      console.log(this.electrics, 'electric');
    });
  }
  uploadElectricId() {

    this.houseEnergy.uploadElectricId({
      email: this.appConstants.email,
      lead_id: this.leadId,
      action: 'upload',
      elecID: this.electricId,
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      console.log(this.data, 'yearly');
    }, error => {
      if (error && error && error.message) {
        this.toastr.error(error.message);
      }
    });
  }

}
