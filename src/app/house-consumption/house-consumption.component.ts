import {
  AfterContentChecked,
  ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {HomeService} from '../home/home.service';
import {Constants} from '../app.constant';
import {ToastrService} from 'ngx-toastr';
import {HouseConsumption} from "./house-consumption.model";

@Component({
  selector: 'app-house-consumption',
  templateUrl: './house-consumption.component.html',
  styleUrls: ['./house-consumption.component.scss']
})
export class HouseConsumptionComponent implements OnInit, OnChanges{

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() consumptionStep;
  @Output() skip: EventEmitter<any> = new EventEmitter<any>();
  @Output() extraInput1: EventEmitter<any> = new EventEmitter<any>();
  // @Input() public consumption: any = {
  //   numPeople: 1,
  //   YearlyElecRequired: '',
  //   electricId: ''
  //
  // };
  @Input() public consumption: HouseConsumption;
  @Input() leadId: string;
  @Input() yearly: string;
  data;
  electricId ;
  electrics = [];
  edit = 0;
  getSupplier = false;

  constructor(private appConstants: Constants,
              private homeService: HomeService,
              private  toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
    this.getSupplier = false;
    this.consumption = new HouseConsumption();
    this.consumption.numPeople = 1;
  }

  ngOnInit(): void {
    this.electrics = [];
    this.extraInput(event);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.leadId && this.leadId !== '' && this.yearly && this.yearly !== '') {
      this.getElectricSupplier();
    }
  }


  public submitForm(): void {
    this.onSubmit.emit({
      value: this.consumption, electricId: this.electricId
    });
  }

  public skip1() {
    this.skip.emit({
      value: this.consumption
    });
  }

  public extraInput(event): void {
    console.log('event');
    this.extraInput1.emit({
      value: this.consumption
    });
  }

  getElectricSupplier() {
    this.electricId = 0;
    this.homeService.getElectricSupplier({
      email: this.appConstants.email,
      lead_id: this.leadId,
      action: 'getsupplierdata'
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      this.electrics = this.data.ListofSuppliers;
      // this.electricId = this.data.ListofSuppliers[0].elecID;
      // this.uploadElectricId();
      this.electricId  = parseInt(this.data.ListofSuppliers[0].elecID);
    }, error => {
      this.toastr.warning('Supplier list not found Please try again ', 'Oops');
      this.getSupplier = true;
    });
  }

  uploadElectricId() {

    this.homeService.uploadElectricId({
      email: this.appConstants.email,
      lead_id: this.leadId,
      action: 'upload',
      elecID: this.electricId,
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      console.log(this.data, 'yearly');
    });
  }

}
