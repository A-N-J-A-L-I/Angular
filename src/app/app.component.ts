import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HomeService} from "./home/home.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'symb-ssr-app';

  //
  // constructor(private translate: TranslateService,  private homeService: HomeService,) {
  //     this.translate.setDefaultLang('en');
  //     if (this.homeService.getLanguage() && this.homeService.getLanguage() !== '') {
  //       this.translate.use(this.homeService.getLanguage());
  //     } else {
  //       this.translate.use('en');
  //       this.homeService.setLanguage('en');
  //     }
  //
  // }
}
