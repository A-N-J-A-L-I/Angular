import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResultRoutingModule} from './result-routing.module';
import {ResultComponent} from './result/result.component';
import {IndependenceComponent} from './independence/independence.component';
import {ConsumptionComponent} from './consumption/consumption.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {HowFutherComponent} from './how-futher/how-futher.component';
import {EconomicComponent} from './economic/economic.component';
import {TypicalDayComponent} from './typical-day/typical-day.component';
import {ChartsModule} from 'ng2-charts';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatRadioModule} from '@angular/material/radio';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {UiSwitchModule} from 'ngx-toggle-switch';

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { SustainabilityComponent } from './sustainability/sustainability.component';
import {ErrorComponent} from "./components/error/error.component";
import {LoaderInterceptor} from "../loader/loader.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {TooltipModule} from "ngx-bootstrap/tooltip";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({

  declarations: [
    ResultComponent,
    IndependenceComponent,
    ConsumptionComponent,
    HowFutherComponent,
    EconomicComponent,
    TypicalDayComponent,
    ErrorComponent,
    SustainabilityComponent
  ],

  imports: [
    CommonModule,
    NgxSpinnerModule,
    ResultRoutingModule,
    RoundProgressModule,
    ChartsModule,
    FormsModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    MatRadioModule,
    CarouselModule.forRoot(),
    UiSwitchModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ],
    entryComponents: [
    ErrorComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },

  ],

})
export class ResultModule {
}
