import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HousePriorityService} from "./house-priority.service";
import {ToastrService} from "ngx-toastr";
import {FormDataModel} from "../home/home.model";
import {HousePriorityCategory} from "./house-priority.model";
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-house-priority',
  templateUrl: './house-priority.component.html',
  styleUrls: ['./house-priority.component.scss']
})
export class HousePriorityComponent implements OnInit, OnChanges {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  @Input() leadId: string;
  @Input() prirorityStep;
  trash = faTrash;
  check = false;

  priorityCategories: HousePriorityCategory[];

  selectedList;

  constructor(
    private housePriorityService: HousePriorityService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.selectedList = [];
    this.priorityCategories = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.leadId && this.leadId !== '') {
      this.getPriorityListItems();
    }
  }

  private getPriorityListItems() {
    const keyLabelMapper = {
      FIN: 'Financial Benefits',
      SUS: 'Sustainibility',
      PHY: 'Physical Benefits'
    }
    this.housePriorityService.getPriorityListItems(this.leadId).subscribe(res => {
      const response = res as any;
      if (response.PriorityListLookup && response.PriorityListLookup['Priority Strings']) {
        let catMapper = {};
        for (let key in response.PriorityListLookup['Priority Strings']) {
          let cat = key.substr(0, key.indexOf('-'));
          if (!catMapper[cat]) {
            catMapper[cat] = [];
          }
          catMapper[cat].push({
            key: key,
            label: response.PriorityListLookup['Priority Strings'][key]
          });
        }
        console.log(catMapper)
        for (let key in catMapper) {
          let tempCat = new HousePriorityCategory()
          tempCat.key = key;
          tempCat.list = catMapper[key];
          tempCat.label = keyLabelMapper[key.toUpperCase()];
          this.priorityCategories.push(tempCat);
        }
      }
    }, error => {
      if (error && error && error.message) {
        this.toastr.error(error.message);
      }
    });
  }

  public selectItem(category, key): void {
    category.list.forEach((item) => {
      if (item.key === key) {
        if (!item.isSelected && !item.isChecked) {
          item.isSelected = true;
          this.check = true;
          this.selectedList.push(item);
        }
      }
    });
  }


  public submitForm(): void {
    this.onSubmit.emit({
      list: this.selectedList
    });
  }

  removePriority(item) {
    this.selectedList = this.selectedList.filter(value => item.key !== value.key);
    this.priorityCategories.forEach(category => {
      category.list.forEach(priority => {
        if (item.key === priority.key) {
          item.isSelected = false;
          item.isChecked = false;
        }
      });
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedList, event.previousIndex, event.currentIndex);
  }

}
