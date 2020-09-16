import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Constants} from "../app.constant";
import {HomeService} from "../home/home.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-house-roof-area',
  templateUrl: './house-roof-area.component.html',
  styleUrls: ['./house-roof-area.component.scss']
})
export class HouseRoofAreaComponent implements OnInit , OnChanges  {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() roofStep;
  @Input() roofArea: number;
  @Input() area;
leadId;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.area && this.roofArea) {
    //   this.roofArea = this.area;
    // }
  }

  public submitForm(): void {
    this.onSubmit.emit({
      roofArea: this.roofArea
    });
  }

  // checkAreaLoaction()  {
  //   this.homeService.checkAreaLoaction({
  //     email: this.appConstants.email,
  //     lead_id: this.leadId,
  //     check: 'area' }).subscribe(res);
  // }
}
