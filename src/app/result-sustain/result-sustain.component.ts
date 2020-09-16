import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResultDataService} from "../result/result.service";

@Component({
  selector: 'app-result-sustain',
  templateUrl: './result-sustain.component.html',
  styleUrls: ['./result-sustain.component.scss']
})
export class ResultSustainComponent implements OnInit {
  @Output() stepChanges: EventEmitter<any> = new EventEmitter<any>();
  storage = 'PV-without-storage';
  bsModalRef;
  leadId;
  data;
  trees;
  autoKM;
  co2;
  constructor(    private resultDataService: ResultDataService,) {
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
    });
  }

  ngOnInit(): void {
    this.changeSeason();
  }
  public next(): void {
    this.stepChanges.emit({
    });
  }
  changeSeason() {
    if (this.storage === 'PV-without-storage') {
      this.co2 = Math.round(this.data?.Output.CO2redpercentt);
      this.autoKM = Math.round(this.data?.Output.Autokm);
      this.trees = Math.round(this.data?.Output.trees);

    } else {
      this.co2 = Math.round(this.data?.Output.CO2redpercentt);
      this.autoKM = Math.round(this.data?.Output.Autokm);
      this.trees = Math.round(this.data?.Output.trees);

    }
  }
}
