import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {ResultDataService} from "../result/result.service";
import {thistle} from "color-name";

@Component({
  selector: 'app-result-independence',
  templateUrl: './result-independence.component.html',
  styleUrls: ['./result-independence.component.scss']
})
export class ResultIndependenceComponent implements OnInit {
  @Output() stepChanges: EventEmitter<any> = new EventEmitter<any>();
  storage = 'PV-without-storage';
  data;
  season;
  innerWidth;
  yearPercent;
  springPercent;
  summerPercent;
  autumnPercent;
  winterPercent;
  radius;
  titlefont;
  constructor(private  resultDataService: ResultDataService,) {
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
    });
    this.radius = 65;
    this.titlefont = 65;
  }

  ngOnInit(): void {
    this.changeSeason();
    this.onResize(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 573 && this.innerWidth <= 1150 ) {
      this.radius = 40;
      this.titlefont = 30;
    } else if (this.innerWidth >= 1150 && this.innerWidth <= 1333 ) {
     this.radius = 50;
     this.titlefont = 45;
    } else if (this.innerWidth >= 1333 && this.innerWidth <= 1560  ) {
      this.radius = 60;
      this.titlefont = 50;
    } else {
      this.radius = 65;
      this.titlefont = 65;
    }
  }

  public next(): void {
    this.stepChanges.emit({});
  }

  changeSeason() {
    if (this.storage === 'PV-without-storage') {
      this.yearPercent = Math.round(this.data ?.Output.independance['year']
    )
      ;
      this.summerPercent = Math.round(this.data ?.Output.independance['summer']
    )
      ;
      this.springPercent = Math.round(this.data ?.Output.independance['spring']
    )
      ;
      this.autumnPercent = Math.round(this.data ?.Output.independance['autumn']
    )
      ;
      this.winterPercent = Math.round(this.data ?.Output.independance['winter']
    )
      ;
    } else {
      this.yearPercent = Math.round(this.data ?.Output.independanceWbatt['year']
    )
      ;
      this.summerPercent = Math.round(this.data ?.Output.independanceWbatt['summer']
    )
      ;
      this.springPercent = Math.round(this.data ?.Output.independanceWbatt['spring']
    )
      ;
      this.autumnPercent = Math.round(this.data ?.Output.independanceWbatt['autumn']
    )
      ;
      this.winterPercent = Math.round(this.data ?.Output.independanceWbatt['winter']
    )
      ;
    }
  }
}
