import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {


  constructor(private metaTagService: Meta,
              private titleService: Title) {
    this.titleService.setTitle('Privacy page title');
  }

  ngOnInit(): void {
    this.metaTagService.addTags([
      {name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal'},
      {name: 'robots', content: 'index, follow'},
      {name: 'author', content: 'Digamber Singh'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD'},
      {charset: 'UTF-8'}
    ]);
  }

}
