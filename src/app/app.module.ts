import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsAndConditionComponent} from './terms-and-condition/terms-and-condition.component';
// import {MetaModule} from '@ngx-meta/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {HousePitchComponent} from './house-pitch/house-pitch.component';
import {HouseAlignmentComponent} from './house-alignment/house-alignment.component';
import {HouseHotWaterComponent} from './house-hot-water/house-hot-water.component';
import {HouseHeaterComponent} from './house-heater/house-heater.component';
import {HouseConsumptionComponent} from './house-consumption/house-consumption.component';
import {HouseRoofAreaComponent} from './house-roof-area/house-roof-area.component';
import {HouseRoofTypeComponent} from './house-roof-type/house-roof-type.component';
import {ApiEndPoints, Configuration, Constants} from './app.constant';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {ResultModule} from './result/result.module';
import {ROUND_PROGRESS_DEFAULTS, RoundProgressModule} from 'angular-svg-round-progressbar';
import {ChartsModule} from 'ng2-charts';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatRadioModule} from '@angular/material/radio';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {HousePriorityComponent} from './house-priority/house-priority.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogContactComponent} from './dialog-contact/dialog-contact.component';
import {HouseEnergyComponent} from './house-energy/house-energy.component';
import {MatSelectModule} from '@angular/material/select';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSliderModule} from '@angular/material/slider';
import {MatOptionModule} from '@angular/material/core';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CookieService} from 'ngx-cookie-service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TokenInterceptor} from "./auth/token.interceptor";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {NgxSpinnerModule} from "ngx-spinner";
import {LoaderInterceptor} from "./loader/loader.interceptor";
import { NgSelectModule } from '@ng-select/ng-select';
import {AddressComponent} from "./address/address.component";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {MatTabsModule} from "@angular/material/tabs";
import {NewResultComponent} from "./new-result/new-result.component";
import {ResultConsumptionComponent} from "./result-consumption/result-consumption.component";
import {ResultIndependenceComponent} from "./result-independence/result-independence.component";
import {ResultHowFutherComponent} from "./result-how-futher/result-how-futher.component";
import {ResultTypicalDayComponent} from "./result-typical-day/result-typical-day.component";
import {ResultSustainComponent} from "./result-sustain/result-sustain.component";
import {NgCircleProgressModule} from "ng-circle-progress";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {HomeLocationComponent} from "./home-location/home-location.component";
import {ResultFinancialComponent} from "./result-financial/result-financial.component";







export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    TermsAndConditionComponent,
    HousePitchComponent,
    HouseAlignmentComponent,
    HouseHotWaterComponent,
    HouseHeaterComponent,
    HouseConsumptionComponent,
    HouseRoofAreaComponent,
    HouseRoofTypeComponent,
    HousePriorityComponent,
    DialogContactComponent,
    AddressComponent,
    HouseEnergyComponent,
    NewResultComponent,
    ResultConsumptionComponent,
    ResultIndependenceComponent,
    ResultHowFutherComponent,
    ResultTypicalDayComponent,
    ResultSustainComponent,
    HomeLocationComponent,
    ResultFinancialComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    // MetaModule.forRoot(),
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    ModalModule.forRoot(),
    ResultModule,
    RoundProgressModule,
    ChartsModule,
    ResultModule,
    MatRadioModule,
    CarouselModule.forRoot(),
    ToastrModule.forRoot( {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    UiSwitchModule,
    TabsModule.forRoot(),
    TabsModule.forRoot(),
    MatSelectModule,
    MatSliderModule,
    MatOptionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    DragDropModule,
    ProgressbarModule.forRoot(),
    NgxUiLoaderModule,
    NgxSpinnerModule,
    InputsModule,
    MatTabsModule,
    NgCircleProgressModule.forRoot(),
    BsDropdownModule.forRoot(),
    DropDownsModule,
    GooglePlaceModule,

  ],
  entryComponents: [
    DialogContactComponent,
  ],
  providers: [
    ApiEndPoints,
    Configuration,
    Constants,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
