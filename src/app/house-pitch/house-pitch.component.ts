import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-house-pitch',
  templateUrl: './house-pitch.component.html',
  styleUrls: ['./house-pitch.component.scss']
})
export class HousePitchComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() pitchStep;

  @Input() roofPitch;


  constructor() {

  }

  ngOnInit(): void {
  }

  selectPitch(value): void {
    this.roofPitch = value;
  }


  public submitForm(): void {
    this.onSubmit.emit({
      value: this.roofPitch
    });
  }

}
