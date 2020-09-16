import { Component,EventEmitter, Output, OnInit } from '@angular/core';
import {Constants} from "../app.constant";

@Component({
  selector: 'app-home-location',
  templateUrl: './home-location.component.html',
  styleUrls: ['./home-location.component.scss']
})
export class HomeLocationComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  location;
  constructor( private appConstants: Constants,) {

  }

  ngOnInit(): void {
    this.submitForm();
  }
  public submitForm(): void {
    this.onSubmit.emit({
    });
  }
}
