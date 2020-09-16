import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndependenceComponent} from './independence/independence.component';
import {ResultComponent} from './result/result.component';
import {ConsumptionComponent} from './consumption/consumption.component';
import {TypicalDayComponent} from './typical-day/typical-day.component';
import {EconomicComponent} from './economic/economic.component';
import {HowFutherComponent} from './how-futher/how-futher.component';
import {SustainabilityComponent} from "./sustainability/sustainability.component";


const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
    children: [
      {
        path: '',
        component: IndependenceComponent
      },
      {
        path: 'result/independence',
        component : IndependenceComponent},
      {
        path: 'result/consumption',
        component: ConsumptionComponent
      },
      {
        path: 'result/typicalday',
        component: TypicalDayComponent
      },
      {
        path: 'result/economic',
        component: EconomicComponent
      },
      {
        path: 'result/how-futher',
        component: HowFutherComponent
      },
      {
        path: 'result/sustain',
        component: SustainabilityComponent
      }

    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
