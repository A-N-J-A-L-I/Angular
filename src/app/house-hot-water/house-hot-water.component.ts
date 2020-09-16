import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-house-hot-water',
  templateUrl: './house-hot-water.component.html',
  styleUrls: ['./house-hot-water.component.scss']
})
export class HouseHotWaterComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() waterStep;
  selectedHotWaterEquipment;

  constructor() {
  }

  ngOnInit(): void {
  }

  selectOption(value) {
    this.selectedHotWaterEquipment = value;
  }

  public submitForm(): void {
    this.onSubmit.emit({
      value: this.selectedHotWaterEquipment
    });
  }
}
