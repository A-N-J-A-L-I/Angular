import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  onClose: any;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  showContact() {
    this.onClose({
      status: true
    });
  }

}
