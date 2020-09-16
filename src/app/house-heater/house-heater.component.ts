import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-house-heater',
  templateUrl: './house-heater.component.html',
  styleUrls: ['./house-heater.component.scss']
})
export class HouseHeaterComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() heaterStep;
  selectedHeaterEquipment;

  constructor() {
  }

  ngOnInit(): void {
  }

  public submitForm(): void {
    this.onSubmit.emit({
      value: this.selectedHeaterEquipment
    });
  }


  selectOption(value) {
    this.selectedHeaterEquipment = value;
  }

}
